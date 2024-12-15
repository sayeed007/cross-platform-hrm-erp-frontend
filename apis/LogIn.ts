import axiosInstance from "../utils/axiosInstance";
import { resolveApiError } from "./ErrorHandler";



export const userLogIn = (username: string, password: string) => {
    return axiosInstance.post(`/account/signin`, {
        username,
        password,
    })
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};

