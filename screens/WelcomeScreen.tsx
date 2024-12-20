import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';

interface WelcomeScreen {
    setHasSeenWelcome: (value: boolean) => void; // Define the type of the setLoading function
}

const WelcomeScreen: React.FC<WelcomeScreen> = ({ setHasSeenWelcome }) => {
    const handleGetStarted = async () => {
        try {
            // Set the flag in AsyncStorage
            await AsyncStorage.setItem('hasSeenWelcome', 'true');
            setHasSeenWelcome(true);
        } catch (error) {
            console.error('Error saving AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/WelcomeScreen-hi-five.png')} // Replace with your image path
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to Tafuri HR</Text>
            <Text style={styles.subtitle}>
                Your all-in-one solution for attendance, leave & all other HR modules.
            </Text>
            <TouchableOpacity onPress={handleGetStarted} style={styles.buttonContainer}>
                <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors?.white,
    },
    image: {
        width: '70%',
        height: 200,
        marginBottom: 24,
    },
    title: {
        ...textStyle?.bold24,
        textAlign: 'center',
        color: colors?.black,
        marginBottom: 8,
    },
    subtitle: {
        ...textStyle?.regular14,
        textAlign: 'center',
        color: colors?.black,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '80%',
        borderRadius: 8
    },
    button: {
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: colors?.white,
        ...textStyle?.bold16,
    },
});

export default WelcomeScreen;
