import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';

interface LoaderProps {
    visible: boolean;
    isStatic?: boolean; // Use the static image if true
}

const FullPageLoader: React.FC<LoaderProps> = ({ visible, isStatic = false }) => {
    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.loaderContainer}>
                    <Image
                        source={
                            isStatic
                                ? require('../../assets/images/StaticLoader.png') // Static image
                                : require('../../assets/images/Loader.gif') // Animated loader
                        }
                        style={styles.loaderImage}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    loaderImage: {
        width: '60%',
        height: '100%',
    },
});

export default FullPageLoader;
