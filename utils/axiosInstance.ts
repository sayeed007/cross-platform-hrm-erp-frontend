import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../Server';
import isAuth from './isAuth'; // Adjust the path

const axiosInstance = axios.create({
    baseURL: BASE_URL.baseApi,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const { isValid, user } = await isAuth();
            if (isValid && user?.accessToken) {
                // Add Authorization header
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
        } catch (error) {
            console.error('Error in request interceptor:', error);
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized - Clearing storage');
            await AsyncStorage.clear();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
