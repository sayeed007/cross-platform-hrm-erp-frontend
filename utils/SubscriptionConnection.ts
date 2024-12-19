// NEW IMPLEMENTATION - 10 DEC, 2024
import axios from "axios";
import React, { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp, { Client, Message } from "stompjs";
import { BASE_URL } from "../Server";
import { useUser } from "../context/UserContext";

// Define props interface
interface SubscriptionConnectionProps {
    setMessage: (message: string) => void;
    setLength: (length: number) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

interface Notification {
    hasSeen: boolean;
}

// Define user type from localStorage
interface UserAuth {
    employeeId: string;
    username: string;
    accessToken: string;
}

const SubscriptionConnection: React.FC<SubscriptionConnectionProps> = (props) => {
    const { user } = useUser();
    const username = user?.username;
    const employeeId = user?.employeeId ? user?.employeeId?.toString() : '';
    const token = user?.accessToken ?? '';

    // Define constants
    const notificationBaseApi = `${BASE_URL.baseApi}`;
    const stompEndpoint = "/userNotification";
    const destinationPrefix = "/users";
    const destination = "/queue/messages";
    const subscribeUrl = `${destinationPrefix}${destination}`;

    // Connect to WebSocket
    const connect = () => {
        try {
            const socket = new SockJS(`${notificationBaseApi}${stompEndpoint}`);
            const stompClient: Client = Stomp.over(socket);

            stompClient.connect(
                { username, Authorization: `Bearer ${token}` },
                (frame) => {
                    console.info("Connected to WebSocket:", frame);
                    subscribe(stompClient, subscribeUrl, employeeId);
                },
                (error) => {
                    console.error("Connection error:", error);
                }
            );

        } catch (error) {
            console.error("Error connecting to WebSocket:", error);
        }
    };

    // Subscribe to a specific destination
    const subscribe = (stompClient: Client, destination: string, employeeId: string) => {
        try {
            if (stompClient) {
                stompClient.subscribe(
                    destination,
                    (message: Message) => {
                        handleNewMessage(message?.body);
                    },
                    { id: employeeId }
                );
            }
        } catch (error) {
            console.error("Error during subscription:", error);
        }
    };

    // Handle new messages
    const handleNewMessage = (messageBody: string) => {
        getNotification(token, employeeId);
        props.setMessage(messageBody);
    };

    // Fetch unread notifications
    const getNotification = async (token: string, employeeId: string) => {
        try {
            const response = await axios.get<Notification[]>(
                `${notificationBaseApi}/notification/v1/previousNotifications/${employeeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const unreadCount = response.data.filter((item) => !item.hasSeen).length;
            props.setLength(unreadCount);
            props.setVisible(!props.visible);
        } catch (error) {
            console.info("No notifications found:", error?.message);
        }
    };

    // Connect and set an interval
    useEffect(() => {
        if (employeeId && username) {
            connect();
        }

        const intervalId = setInterval(() => {
            if (employeeId && username) {
                connect();
            }
        }, 120000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [employeeId && username]);

    return null; // No UI rendered
};

export default SubscriptionConnection;







// OLD IMPLEMENTATION
// import axios from "axios";
// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import Config from '../../Config';

// const SubscriptionConnection = (props) => {
//     const [visible, setVisible] = useState(false);

//     try {
//         const user_id = JSON.parse(localStorage.w_auth).employeeId;
//         const user_name = JSON.parse(localStorage.w_auth).username;
//         connect(user_name, user_id);
//     } catch (error) {
//     };

//     useEffect(() => {
//         setInterval(() => {
//             try {
//                 const user_id = JSON.parse(localStorage.w_auth).employeeId;
//                 const user_name = JSON.parse(localStorage.w_auth).username;
//                 connect(user_name, user_id);
//             } catch (error) {
//             };

//         }, 120000);
//     }, [visible])
//     function connect(username, userid) {
//         var stompClient = null;
//         var notification_baseApi = `${Config.baseApi}`;
//         var registeredStompEndpoint = '/userNotification';
//         //var SockJS = require('sockjs-client');

//         var sockjs_connection_url = notification_baseApi + registeredStompEndpoint;
//         var socket = new SockJS(sockjs_connection_url);

//         var destinationPrefix = '/users';
//         var destination = '/queue/messages';
//         var subscribe_url = destinationPrefix + destination;
//         //var Stomp = require('stompjs')
//         var stompClient = Stomp.over(socket);
//         stompClient.connect({ username: username },
//             function (frame) {
//                 if (stompClient) {
//                     subscribe(stompClient, subscribe_url, userid);
//                 }

//             });
//     };


//     const getNotification = (token, user_id) => {
//         var notification_baseApi = `${Config.baseApi}`;
//         var registeredStompEndpoint = '/userNotification';
//         var sockjs_connection_url = notification_baseApi + registeredStompEndpoint;
//         var socket = new SockJS(sockjs_connection_url);
//         var destinationPrefix = '/users';
//         var destination = '/queue/messages';
//         var subscribe_url = destinationPrefix + destination;
//         var stompClient = Stomp.over(socket);
//         axios.get(`${Config.baseApi}/notification/v1/previousNotifications/${user_id}`, {
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//             .then(response => {
//                 let notification_unread_count = 0;
//                 response.data.forEach(element => {
//                     if (element.hasSeen == false) {
//                         notification_unread_count++;
//                     }
//                 });
//                 props.setLength(notification_unread_count)
//                 subscribe(stompClient, subscribe_url, user_id);
//                 props.setVisible(!props.visible)

//             })
//             .catch(error => {
//                 console.info("No notification found");
//             });
//     };

//     function subscribe(stompClient, destination, userid) {
//         const user_id = JSON.parse(localStorage.w_auth).employeeId;
//         const token = JSON.parse(localStorage.w_auth).accessToken;

//         try {
//             if (stompClient !== null) {
//                 stompClient.subscribe(
//                     destination,
//                     (message) => {
//                         getNotification(token, user_id);
//                         props.setMessage(message?.body);
//                         setVisible(true);
//                     },
//                     { id: userid }
//                 );
//             }
//         } catch (error) {
//             console.error("Can't connect and subscribe, " + error + " occurred");
//         }
//     };


//     return (
//         <>


//         </>
//     )
// }

// export const newNotification = (newNotification) => newNotification;
// export default SubscriptionConnection;




