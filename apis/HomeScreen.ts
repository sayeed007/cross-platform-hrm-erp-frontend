import { ModifyAttendanceClockInOutFormData } from "../typeInterfaces/ModifyAttendanceClockInOutFormData";
import axiosInstance from "../utils/axiosInstance";
import { resolveApiError } from "./ErrorHandler";


// ###################################################################
//  GET API's
// ###################################################################
export const getEmployeeAttendanceForClocking = (employeeId: number, timeStamp: number) => {
    return axiosInstance.get(`/attendance/clock-in-out/employee/${employeeId}/attendance-with-roster?timestamp=${timeStamp}&includeLastAttendanceWithInTime=true`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};



// ###################################################################
//  UPDATE API's
// ###################################################################



export const modifyAttendanceClockInOut = (formData: ModifyAttendanceClockInOutFormData) => {
    return axiosInstance.put(`/attendance/clock-in-out`, formData)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};