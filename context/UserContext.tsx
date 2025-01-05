import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native'; // React Navigation for logout redirection
import { useErrorModal } from './ErrorModalProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { User } from '../typeInterfaces/User';
import { encryptData } from '../utils/encryptDecryptCredentials';
import { CredentialType } from '../screens/LoginScreen';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => Promise<void>;
    logout: () => Promise<void>;
    validateToken: () => boolean; // Returns true if token is valid
}

type RootNavigationProp = StackNavigationProp<RootStackParamList>;
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigation = useNavigation<RootNavigationProp>();
    const { showError } = useErrorModal();

    // Load user data from AsyncStorage when the component mounts
    useEffect(() => {
        const initializeUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser: User = JSON.parse(storedUser);
                    if (validateToken(parsedUser.accessToken)) {
                        setUser(parsedUser);
                    } else {
                        handleInvalidToken();
                    }
                }
            } catch (error) {
                console.error('Error loading user:', error);
            }
        };

        initializeUser();
    }, []);

    // Save user data to AsyncStorage
    const saveUserToStorage = async (user: User | null) => {
        try {
            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify(user));
            } else {
                await AsyncStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Error saving user to storage:', error);
        }
    };

    // Validate the user's JWT token
    const validateToken = (token?: string): boolean => {
        if (!token && user) token = user.accessToken;
        if (!token) return false;

        try {
            const decoded: JwtPayload & { exp: number } = jwtDecode(token);
            const expirationTime = decoded.exp * 1000; // Convert to milliseconds
            return Date.now() < expirationTime;
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    };

    // Handle logout
    const logout = async () => {
        try {
            // Step 1: Save credentials to a different key using encryption
            const storedCredential = await AsyncStorage.getItem('user-credentials');
            const storedHasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');

            // Step 2: Clear all storage
            await AsyncStorage.clear();

            if (storedCredential) {
                await AsyncStorage.setItem('user-credentials', storedCredential);
            }

            if (storedHasSeenWelcome) {
                await AsyncStorage.setItem('hasSeenWelcome', storedHasSeenWelcome);
            }

            setUser(() => null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };



    // Handle invalid or expired token
    const handleInvalidToken = () => {
        showError('Session expired. Please log in again.', () => logout());
    };

    // Set user and store in AsyncStorage
    const setUserAndStore = async (user: User | null) => {
        setUser(user);
        await saveUserToStorage(user);
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserAndStore, logout, validateToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
