import moment from "moment";
import axiosInstance from "../utils/axiosInstance";
import { resolveApiError } from "./ErrorHandler";


// ###################################################################
//  GET API's
// ###################################################################
export const getMonthAndYearWiseAttendanceForEmployee = (employeeId: number, monthYearString: string) => {

    // Parse the string and find start and end of the month
    const startOfMonth = moment(monthYearString, 'MMMM, YYYY').startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(monthYearString, 'MMMM, YYYY').endOf('month').format('YYYY-MM-DD');


    return axiosInstance.get(`/attendance/employee/${employeeId}?startdate=${startOfMonth}&enddate=${endOfMonth}`)
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};

export const getDailyAttendanceForEmployee = (employeeId: number, date: string) => {

    return axiosInstance.get(`/attendance/employee/${employeeId}?startdate=${date}&enddate=${date}`)
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

export const requestManualAttendanceForEmployee = (employeeId: number, requestBody: {}) => {

    return axiosInstance.put(
        `/attendance/employee/${employeeId}/request`,
        requestBody
    )
        .then(response => {
            return [response.data];
        })
        .catch(error => {
            return resolveApiError(error);
        });
};


