import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native'; // React Navigation for logout redirection
import { useErrorModal } from './ErrorModalProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/navigationTypes';

// Define the User type
export interface User {
    employeeVisibleId: string;
    employeeId: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    profilePicPath: string;
    thumbnails_path_01: string;
    thumbnails_path_02: string;
    employmentStatus: string;
    joiningDate: string;
    currentLoginTime: string;
    previousLoginTime: string;
    companyId: number;
    companyLogoPath: string | null;
    companyName: string;
    departmentId: number;
    departmentName: string;
    designationId: number;
    designationName: string;
    grade: number;
    gradeLabel: string;
    featureGroups: any[];
    isTeamLeader: boolean;
    isHeadOfDepartment: boolean;
    isLineManager: boolean;
    isProjectManager: boolean | null;
    accessToken: string;
    tokenType: string;
    [key: string]: any; // Extendable for additional fields
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    validateToken: () => boolean; // Returns true if token is valid
}

type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { showError } = useErrorModal();
    const navigation = useNavigation<RootNavigationProp>();

    // Load user data from storage on app initialization
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    if (validateToken(parsedUser.accessToken)) {
                        setUser(parsedUser);
                    } else {
                        handleInvalidToken(); // Automatically handle expired token
                    }
                }
            } catch (error) {
                console.error('Error loading user from storage:', error);
            }
        };
        loadUser();
    }, []);

    // Save or clear user data in AsyncStorage
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

    // Logout the user and reset the navigation stack
    const logout = () => {
        setUser(null);
        saveUserToStorage(null);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    // Handle invalid or expired token
    const handleInvalidToken = () => {
        showError('Session expired. Please log in again.', () => {
            logout();
        });
    };

    // Validate the user's token
    const validateToken = (token?: string): boolean => {
        if (!token && user) token = user.accessToken; // Use user's token if not provided
        if (!token) return false;

        try {
            const decoded: JwtPayload & { exp: number } = jwtDecode(token);
            const exp = decoded.exp * 1000; // Convert expiration time to milliseconds
            return Date.now() < exp; // Check if the token is still valid
        } catch (error) {
            console.error('Error decoding token:', error);
            return false; // Invalid token
        }
    };

    // Update user state and save to storage
    const setUserAndStore = (user: User | null) => {
        setUser(user);
        saveUserToStorage(user);
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
