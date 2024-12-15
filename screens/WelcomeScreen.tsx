import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

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
                <LinearGradient
                    colors={['#007BFF', '#4A90E2']} // Gradient colors
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </LinearGradient>
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
        backgroundColor: '#fff',
    },
    image: {
        width: '70%',
        height: 200,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default WelcomeScreen;
