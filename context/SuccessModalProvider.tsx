import React, { createContext, useContext, useState, useRef } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';

interface SuccessModalContextType {
    showSuccess: (message: string, onClose?: () => void, delay?: number) => void;
}

const SuccessModalContext = createContext<SuccessModalContextType | undefined>(undefined);

export const SuccessModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const onCloseRef = useRef<(() => void) | null>(null); // Use ref to avoid stale closure issues

    const showSuccess = (msg: string, onClose?: () => void, delay = 2000) => {
        setMessage(msg);
        setIsVisible(true);

        // Store the callback in a ref
        if (onClose) {
            onCloseRef.current = onClose;
        }

        // Automatically close the modal after the specified delay
        setTimeout(() => {
            closeSuccess();
        }, delay);
    };

    const closeSuccess = () => {
        setIsVisible(false);

        // Trigger the callback from the ref
        if (onCloseRef.current) {
            onCloseRef.current();
            onCloseRef.current = null; // Clear the ref to avoid reuse
        }
    };

    return (
        <SuccessModalContext.Provider value={{ showSuccess }}>
            {children}
            {isVisible && (
                <Modal animationType="fade" transparent visible={isVisible}>
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <GenerateAndViewIcon
                                iconName="checked-circle"
                                size={64}
                            />
                            <Text style={styles.message}>{message}</Text>
                        </View>
                    </View>
                </Modal>
            )}
        </SuccessModalContext.Provider>
    );
};

export const useSuccessModal = (): SuccessModalContextType => {
    const context = useContext(SuccessModalContext);
    if (!context) {
        throw new Error('useSuccessModal must be used within a SuccessModalProvider');
    }
    return context;
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.modalBG,
    },
    modalContainer: {
        width: '60%',
        padding: 20,
        backgroundColor: colors?.white,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: colors?.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    message: {
        ...textStyle?.semibold16,
        textAlign: 'center',
        marginVertical: 16,
        color: colors?.black,
    },
});
