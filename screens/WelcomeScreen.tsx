import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen: React.FC = () => {
    const handleGetStarted = async () => {
        try {
            // Set the flag in AsyncStorage
            await AsyncStorage.setItem('hasSeenWelcome', 'true');
            location.reload(); // Reload to trigger RootNavigation flow
        } catch (error) {
            console.error('Error saving AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Tafuri HR</Text>
            <Text style={styles.subtitle}>
                Your all-in-one solution for attendance, leave & HR module.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
