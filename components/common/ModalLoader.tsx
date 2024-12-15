import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface LoaderModalProps {
    visible: boolean;
    message?: string; // Optional loader message
    color?: string; // Custom color for the spinner
    backgroundOpacity?: number; // Custom opacity for the background
}

const ModalLoader: React.FC<LoaderModalProps> = ({
    visible,
    message = 'Loading...', // Default message
    color = '#4F46E5', // Default spinner color
    backgroundOpacity = 0.4, // Default background opacity
}) => {
    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View
                style={[
                    styles.overlay,
                    { backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` },
                ]}
            >
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={color} />
                    {message && <Text style={styles.message}>{message}</Text>}
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
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
        minWidth: 150,
    },
    message: {
        marginTop: 12,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});

export default ModalLoader;
