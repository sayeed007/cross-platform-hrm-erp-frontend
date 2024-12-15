import axiosInstance from "../utils/axiosInstance";
import { resolveApiError } from "./ErrorHandler";



export const requestToUpdatePassword = (reqBody) => {
    return axiosInstance.put(`/account/auto/updatepassword`, reqBody)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};

