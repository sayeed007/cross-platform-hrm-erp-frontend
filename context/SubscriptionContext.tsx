import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Client, Message } from "@stomp/stompjs";
import { BASE_URL } from "../Server";
import { useUser } from "../context/UserContext";
import SockJS from "sockjs-client";
import { Notification } from "../typeInterfaces/Notification";

interface SubscriptionContextType {
    message: string | null;
    unreadCount: number;
    visible: boolean;
    setVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
    connectToWebSocket: () => void;
    notifications: Notification[];
}

interface CustomError {
    message: string;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [message, setMessage] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const stompClientRef = useRef<Client | null>(null);

    const employeeId = user?.employeeId ? user.employeeId.toString() : "";
    const token = user?.accessToken ?? "";
    const username = user?.username ?? "";
    const notificationBaseApi = `${BASE_URL.baseApi}`;
    const stompEndpoint = "/userNotification";
    const destinationPrefix = "/users";
    const destination = "/queue/messages";
    const subscribeUrl = `${destinationPrefix}${destination}`;

    // WebSocket connection logic
    const connectToWebSocket = () => {
        if (stompClientRef.current) {
            console.info("WebSocket is already connected.");
            return;
        }

        try {
            console.info("Trying to connect WebSocket...");
            const socket = new SockJS(`${notificationBaseApi}${stompEndpoint}`);
            const stompClient: Client = new Client({
                // brokerURL: `${notificationBaseApi}${stompEndpoint}`,
                webSocketFactory: () => socket,
                connectHeaders: {
                    username,
                    Authorization: `Bearer ${token}`,
                },
                reconnectDelay: 5000, // Automatically reconnect after 5 seconds
                onConnect: () => {
                    console.info("Connected to WebSocket.");
                    stompClient.subscribe(
                        subscribeUrl,
                        (message: Message) => {
                            handleNewMessage(message.body);
                        },
                        { id: employeeId }
                    );
                },
                onStompError: (error) => {
                    console.error("STOMP error:", error);
                },
                onWebSocketClose: (evt) => {
                    console.error("WebSocket connection closed:", evt);
                },
                onDisconnect: (frame) => {
                    console.error("Disconnected from WebSocket:", frame);
                },
            });

            stompClient.activate();
            stompClientRef.current = stompClient;
        } catch (error) {
            console.error("Error connecting to WebSocket:", error);
        }
    };


    // Handle incoming messages
    const handleNewMessage = (messageBody: string) => {
        setMessage(messageBody);
        setVisible(!visible);
        fetchNotifications();
    };

    // Fetch notifications
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Notification[]>(
                `${notificationBaseApi}/notification/v1/previousNotifications/${employeeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const unread = response.data.filter((notification) => !notification.hasSeen).length;
            setUnreadCount(unread);
            setNotifications(response.data);
        } catch (error) {
            const customError = error as CustomError;
            console.info("No notifications found:", customError?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (employeeId && token) {
            fetchNotifications();
        }
    }, [employeeId, token]);

    // Establish WebSocket connection on component mount
    useEffect(() => {
        if (employeeId && username) {
            connectToWebSocket();
        }

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                console.info("WebSocket disconnected.");
                stompClientRef.current = null;
            }
        };
    }, [employeeId, username]);

    return (
        <SubscriptionContext.Provider
            value={{ message, unreadCount, visible, setVisible, notifications, connectToWebSocket }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

// Custom hook for accessing the context
export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscription must be used within a SubscriptionProvider");
    }
    return context;
};
