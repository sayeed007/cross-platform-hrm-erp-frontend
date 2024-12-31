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

export const getActualAndRemainingLeaveCount = (employeeId: number, userId: number) => {
    return axiosInstance.get(`/employee/${employeeId}/remaining-leave-count?by-viewerId=${userId}`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};


export const getAllLeaveRequestOfAnEmployee = (employeeId: number) => {
    return axiosInstance.get(`/employee/${employeeId}/leave_request/all`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};

export const getRemainingLeaveCountForAnEmployee = (employeeId: number) => {
    return axiosInstance.get(`employee/${employeeId}/remaining-leave-count`)
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


// ###################################################################
// DELETE API's
// ###################################################################

export const deleteIndividualLeaveRequest = (senderId: number, leaveRequestId: number) => {
    return axiosInstance.delete(`/employee/${senderId}/leave_request/${leaveRequestId}`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};