import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';
import LottieView from 'lottie-react-native';

interface LoaderProps {
    visible: boolean;
    isStatic?: boolean; // Use the static image if true
}

const FullPageLoader: React.FC<LoaderProps> = ({ visible, isStatic = false }) => {
    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.loaderContainer}>
                    <LottieView
                        source={require('../../assets/lottie/FullPageLoading.json')}
                        autoPlay
                        loop
                        style={styles.loaderImage}
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
        backgroundColor: colors?.white, // Semi-transparent overlay
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.white,
        ...shadowStyles?.popUpShadow2
    },
    loaderImage: {
        width: '100%',
        height: '100%',
    },
});

export default FullPageLoader;
