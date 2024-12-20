import React from 'react';
import { Modal, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';

interface LoaderModalProps {
    visible: boolean;
    message?: string; // Optional loader message
    color?: string; // Custom color for the spinner
    backgroundOpacity?: number; // Custom opacity for the background
}

const ModalLoader: React.FC<LoaderModalProps> = ({
    visible,
    message = 'Loading...', // Default message
    color = colors?.spinner, // Default spinner color
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
        backgroundColor: colors?.white,
        borderRadius: 12,
        minWidth: 150,
        ...shadowStyles?.popUpShadow2
    },
    message: {
        marginTop: 12,
        fontSize: 16,
        color: colors?.black,
        textAlign: 'center',
    },
});

export default ModalLoader;
