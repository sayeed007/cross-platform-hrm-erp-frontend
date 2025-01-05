import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext'; // Import the UserContext
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthStack from './AuthStack';
import { TabBar } from './MainTabsModified';



export default function RootNavigation() {
    const { user, setUser } = useUser(); // Access the user context
    const [loading, setLoading] = useState(true);
    const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                // Check if the user has seen the welcome screen
                const seenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
                setHasSeenWelcome(seenWelcome !== null);

                // Mock user load for demonstration
                // Replace with real logic to fetch or validate stored user
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error initializing app:', error);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);

    if (loading) {
        // Show a splash screen while loading
        return <SplashScreen setLoading={setLoading} />;
    };

    if (!hasSeenWelcome) {
        // Show the welcome screen if it hasn't been seen yet
        return <WelcomeScreen setHasSeenWelcome={setHasSeenWelcome} />;
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
            {user ? <TabBar /> : <AuthStack />}
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 60, // Adjust as needed for your top nav
    },
});
