import React from 'react';
import { Modal, View, StyleSheet, Image } from 'react-native';
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';

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
        backgroundColor: colors?.modalBG, // Semi-transparent overlay
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.offWhite1,
        ...shadowStyles?.popUpShadow2
    },
    loaderImage: {
        width: '60%',
        height: '100%',
    },
});

export default FullPageLoader;
