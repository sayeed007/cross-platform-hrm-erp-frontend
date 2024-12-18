import React, { createContext, useContext, useState, useRef } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ErrorModalContextType {
    showError: (message: string, onClose?: () => void, delay?: number) => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(undefined);

export const ErrorModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const onCloseRef = useRef<(() => void) | null>(null);

    const showError = (msg: string, onClose?: () => void, delay = 3000) => {
        setMessage(msg);
        setIsVisible(true);

        // Store the callback in a ref
        if (onClose) {
            onCloseRef.current = onClose;
        }

        // Automatically close the modal after the specified delay
        setTimeout(() => {
            closeError();
        }, delay);
    };

    const closeError = () => {
        setIsVisible(false);

        // Trigger the callback from the ref
        if (onCloseRef.current) {
            onCloseRef.current();
            onCloseRef.current = null; // Clear the ref to avoid reuse
        }
    };

    return (
        <ErrorModalContext.Provider value={{ showError }}>
            {children}
            {isVisible && (
                <Modal animationType="fade" transparent visible={isVisible}>
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <MaterialIcons name="error" size={64} color="#F44336" />
                            <Text style={styles.message}>{message}</Text>
                        </View>
                    </View>
                </Modal>
            )}
        </ErrorModalContext.Provider>
    );
};

export const useErrorModal = (): ErrorModalContextType => {
    const context = useContext(ErrorModalContext);
    if (!context) {
        throw new Error('useErrorModal must be used within an ErrorModalProvider');
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