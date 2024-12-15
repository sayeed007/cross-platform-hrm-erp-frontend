import React, { createContext, useContext, useState, useRef } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
                            <MaterialIcons name="check-circle" size={64} color="#4CAF50" />
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '60%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    message: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 16,
        color: '#333',
    },
});
