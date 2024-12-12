// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';


export type User = {
    id?: string;
    name?: string;
    email?: string;
};


export const saveUserToStorage = async (user: User): Promise<void> => {
    await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
};

export const removeUserFromStorage = async () => {
    await AsyncStorage.removeItem('loggedInUser');
};
