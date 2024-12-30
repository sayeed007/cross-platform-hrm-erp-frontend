import moment from "moment";
import axiosInstance from "../utils/axiosInstance";
import { resolveApiError } from "./ErrorHandler";
import { BASE_URL } from "../Server";
import axios from "axios";


// ###################################################################
//  GET API's
// ###################################################################


export const AllTransportRoute = (companyId: number, customize?: string) => {
    return (
        axiosInstance.get(`/transport-route/company/${companyId}/all`)
            .then((response) => {
                if (customize === 'CustomizedData') {
                    return [response?.data];
                } else if (customize) {
                    // return (response?.data)
                    const allRoutes = [...response?.data];
                    const routes: any = [];
                    // ROUTE OPTIONS
                    allRoutes.map(obj => {
                        const temp = {};
                        temp.value = obj?.id;
                        temp.label = obj?.routeName;
                        temp.description = obj?.routeDescription;
                        temp.pickupPointsList = [...obj?.pickupPoints];
                        routes.push(temp);
                    });

                    return [routes];
                };

                if (response?.data?.length) {
                    const allRoutes = [...response?.data];
                    const routes = [{ value: "", label: 'All Routes' }];
                    // ROUTE OPTIONS
                    allRoutes.map(obj => {
                        const temp = {};
                        temp.value = obj?.id;
                        temp.label = obj?.routeName;
                        temp.description = obj?.routeDescription;
                        temp.pickupPointsList = [...obj?.pickupPoints];
                        routes.push(temp);
                    });

                    return [routes];
                } else {
                    return [{ value: "", label: 'All Routes' }]
                }
            })
            .catch((error) => {
                return resolveApiError(error);
            })
    )
};


export const getAllSalaryInfoForEmployee = (employeeId: number) => {
    return (
        axiosInstance.get(`/employee/${employeeId}/salary/all`)
            .then((response) => {
                return [response?.data];
            })
            .catch((error) => {
                return resolveApiError(error);
            })
    )
};


// ###################################################################
//  PUT API's
// ###################################################################

export const updateProfilePicture = (employeeId: number, formData: any) => {
    return (
        axiosInstance.put(
            `/employee/${employeeId}/profile_picture/update`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },
        )
            .then((response) => {
                return [response?.data];
            })
            .catch((error) => {
                return resolveApiError(error);
            })
    )
};

export const updateEmployeeName = (employeeId: number, formData: any) => {
    return (
        axiosInstance.put(
            `/employee/${employeeId}/personal`,
            formData,
            {},
        )
            .then((response) => {
                return [response?.data];
            })
            .catch((error) => {
                return resolveApiError(error);
            })
    )
};

