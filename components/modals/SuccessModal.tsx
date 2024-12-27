import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

interface SuccessModalProps {
    isVisible: boolean;
    title: string;
    description: string;
    onContinue: () => void; // Callback function
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    isVisible,
    title,
    description,
    onContinue,
}) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isVisible) {
            // Reset countdown to 3 seconds
            setCountdown(3);

            // Start countdown
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);

                        // Defer `onContinue` to avoid triggering state updates during render
                        setTimeout(() => {
                            onContinue();
                        }, 0);

                        return 0;
                    }
                });
            }, 1000);
        }

        // Cleanup timer when modal is closed or component is unmounted
        return () => clearInterval(timer);
    }, [isVisible, onContinue]);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onContinue}
        >
            <View style={styles.container}>
                <View></View>

                <View>
                    <View style={styles.imageContainer}>
                        <LottieView
                            source={require('../../assets/lottie/SuccessModal.json')}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.description}>
                        Auto Closing in {countdown} second{countdown > 1 ? 's' : ''}...
                    </Text>
                </View>

                <TouchableOpacity onPress={onContinue} style={styles.button}>
                    <Text style={styles.buttonText}>TAP TO CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    imageContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    lottie: {
        width: 200,
        height: 200,
    },
    title: {
        ...textStyle.bold20,
        color: colors.black,
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        ...textStyle.regular14,
        color: colors.gray2,
        textAlign: 'center',
    },
    button: {
        marginTop: 40,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        ...textStyle.semibold16,
        color: colors.black,
    },
});

export default SuccessModal;
