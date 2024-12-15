import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";


export interface DecodedToken {
    exp: number; // Token expiration timestamp
    [key: string]: any; // Additional JWT payload fields
}

const isAuth = async (): Promise<{ isValid: boolean; user: any | null }> => {
    try {
        // Retrieve user data from AsyncStorage
        const storedAuth = await AsyncStorage.getItem('w_auth');
        if (!storedAuth) return { isValid: false, user: null };

        const user = JSON.parse(storedAuth);
        const token = user?.accessToken;
        // Decode and validate the token
        const decoded: DecodedToken = jwtDecode(token);
        const exp = decoded.exp * 1000; // Convert expiration to milliseconds
        if (Date.now() >= exp) {
            return { isValid: false, user: null }; // Token is expired
        }

        return { isValid: true, user }; // Token is valid
    } catch (error) {
        console.error('Error in isAuth:', error);
        return { isValid: false, user: null };
    }
};

export default isAuth;
