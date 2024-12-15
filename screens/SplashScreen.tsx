import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient

interface SplashScreenProps {
    setLoading: (value: boolean) => void; // Define the type of the setLoading function
}

const SplashScreen: React.FC<SplashScreenProps> = ({ setLoading }) => {
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 1500, // 1500 milliseconds
            useNativeDriver: true, // Enables native animations
        }).start(() => {
            // Callback function after animation completes
            setLoading(false);
        });
    }, []);

    const scaleX = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], // Scale from 0 to full size
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Tafuri-hrms-logo-animation.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.footer}>
                <Animated.View
                    style={[
                        styles.loaderContainer,
                        { transform: [{ scaleX }] }, // Use scaleX for animation
                    ]}
                >
                    <LinearGradient
                        colors={['#007AFF', '#0056b3']} // Gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 250,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        width: '80%',
        height: 10,
        backgroundColor: '#e0e0e0', // Light gray for the background
        borderRadius: 5,
        overflow: 'hidden',
    },
    loaderContainer: {
        height: '100%',
        backgroundColor: 'transparent', // Use transparent as LinearGradient handles the color
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
    },
});

export default SplashScreen;
