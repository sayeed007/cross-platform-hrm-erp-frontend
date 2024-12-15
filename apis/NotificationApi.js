import axios from "axios";
import Config from '../../Config';
export const sendNotification = (userId, userName, Id, message) => {
  const token = JSON.parse(localStorage.w_auth).accessToken;
  return axios.post(`${Config.baseApi}/notification/v1/userNotification`, {

    "userInfo": [
      {
        userName: userName,
        userId: userId
      }
    ],
    "senderId": Id,
    "message": message,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      return response.data;

    }).catch(error => {
      console.error(error);
    })
}


export const sendNotificationToMultipleUser = (reqBody) => {
  const token = JSON.parse(localStorage.w_auth).accessToken;
  return axios.post(`${Config.baseApi}/notification/v1/userNotification`, reqBody, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    return [response.data];
  }).catch(error => {
    console.error(error);
  })
}