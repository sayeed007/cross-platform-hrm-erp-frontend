// NEW IMPLEMENTATION - 10 DEC, 2024
import axios from "axios";
import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BASE_URL } from '../Server';

const SubscriptionConnection = (props) => {

    const { employeeId: userId, username, accessToken: token } = JSON.parse(localStorage.w_auth || '{}') || {};

    const notificationBaseApi = `${BASE_URL.baseApi}`;
    const stompEndpoint = '/userNotification';
    const destinationPrefix = '/users';
    const destination = '/queue/messages';
    const subscribeUrl = `${destinationPrefix}${destination}`;

    const connect = () => {
        try {
            const socket = new SockJS(`${notificationBaseApi}${stompEndpoint}`);
            const stompClient = Stomp.over(socket);
            stompClient.connect({ username }, (frame) => {
                console.info('Connected to WebSocket:', frame);
                subscribe(stompClient, subscribeUrl, userId);
            });
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
        }
    };

    const subscribe = (stompClient, destination, userId) => {
        try {
            if (stompClient) {
                stompClient.subscribe(
                    destination,
                    (message) => {
                        handleNewMessage(message?.body);
                    },
                    { id: userId }
                );
            }
        } catch (error) {
            console.error('Error during subscription:', error);
        }
    };

    const handleNewMessage = (messageBody) => {
        getNotification(token, userId);
        props.setMessage(messageBody);
    };

    const getNotification = async (token, userId) => {
        try {
            const response = await axios.get(`${notificationBaseApi}/notification/v1/previousNotifications/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const unreadCount = response.data.filter((item) => !item.hasSeen).length;
            props.setLength(unreadCount);
            props.setVisible(!props.visible)
        } catch (error) {
            console.info('No notifications found:', error.message);
        }
    };

    useEffect(() => {
        if (userId && username) {
            connect();
        }

        const intervalId = setInterval(() => {
            if (userId && username) {
                connect();
            }
        }, 120000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [userId, username]);

    return <></>;
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




