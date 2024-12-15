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


export const getUserAdditionalAccessibility = (employeeId: number, token: string) => {
    return axiosInstance.get(`/employee/${employeeId}/additional-access`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    })
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};


export const getUserInfo = (employeeId: number, token: string) => {
    return axiosInstance.get(`/employee/${employeeId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    })
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};

