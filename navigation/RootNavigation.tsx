// src/navigation/RootNavigation.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserFromStorage } from '../utils/storage';

export default function RootNavigation() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage?.removeItem('hasSeenWelcome');
    }, []);

    // useEffect(() => {
    //     const initialize = async () => {
    //         try {
    //             // Check if the user has seen the welcome screen
    //             const seenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
    //             setHasSeenWelcome(seenWelcome !== null);

    //             // Fetch the logged-in user
    //             const loggedInUser = await getUserFromStorage();
    //             setUser(loggedInUser);
    //         } catch (error) {
    //             console.error('Error initializing app:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     initialize();
    // }, []);

    if (loading) {
        // Show a splash screen while loading
        return <SplashScreen />;
    }

    if (!hasSeenWelcome) {
        // Show the welcome screen if it hasn't been seen yet
        return <WelcomeScreen />;
    }

    return (
        <NavigationContainer>
            {user ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
