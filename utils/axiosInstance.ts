import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isAuth from './isAuth'; // Adjust the path
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; // Adjust the path
import { useErrorModal } from '../context/ErrorModalProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/navigationTypes';

const axiosInstance = axios.create({
    baseURL: 'http://hrm.tafuritechnologies.com:49002',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const { isValid, user } = await isAuth();
        if (isValid && user) {
            // Add Authorization header
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

type RootNavigationProp = StackNavigationProp<RootStackParamList>;

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { showError } = useErrorModal();
        const { setUser } = useUser();
        const navigation = useNavigation<RootNavigationProp>();

        if (error.response?.status === 401) {
            // Token expired or unauthorized access
            showError('Session expired. Please log in again.', async () => {
                await AsyncStorage.clear(); // Clear AsyncStorage
                setUser(null); // Clear user context
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }], // Redirect to Login
                });
            });
        } else if (error.response?.status >= 500) {
            // Handle server errors
            showError('Server error occurred. Please try again later.');
        } else if (error.response?.status === 404) {
            // Handle not found errors
            showError('Requested resource not found.');
        } else {
            // Handle other errors
            showError('An unexpected error occurred. Please try again.');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
