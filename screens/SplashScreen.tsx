import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreenAnimation from '../assets/images/Tafuri-hrms-logo-animation.gif';
import SplashScreenImage from '../assets/images/Tafuri-hrms-logo-animation.png';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Tafuri-hrms-logo-animation.gif')}
                // source={{
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                // }}
                // source={SplashScreenImage}
                // source={SplashScreenAnimation}
                style={styles.logo}
                resizeMode="contain"
            />
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
});

export default SplashScreen;
