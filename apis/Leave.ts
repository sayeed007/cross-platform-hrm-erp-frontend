import axiosInstance from "../utils/axiosInstance";
import { resolveApiError } from "./ErrorHandler";


// ###################################################################
//  GET API's
// ###################################################################
export const getAllPendingLeaveRequestForEmployee = (employeeId: number) => {
    return axiosInstance.get(`/viewer/${employeeId}/leave_request/all`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};


export const getAllAcceptedRejectedLeaveRequestForEmployee = (employeeId: number) => {
    return axiosInstance.get(`/viewer/${employeeId}/accepted_rejected_leave_request/all`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};


// ###################################################################
//  PUT API's
// ###################################################################

export const approveSubordinateLeaveRequest = (employeeId: number, senderId: number, leaveRequestId: number) => {
    return axiosInstance.put(`/employee/${employeeId}/sender/${senderId}/leave_request/${leaveRequestId}/accepted`, {})
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};


export const rejectSubordinateLeaveRequest = (employeeId: number, senderId: number, leaveRequestId: number, requestBody: { content: string }) => {
    return axiosInstance.put(`/employee/${employeeId}/sender/${senderId}/leave_request/${leaveRequestId}/rejected`, requestBody)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};