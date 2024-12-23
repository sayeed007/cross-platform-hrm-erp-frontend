import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

interface ApproveAttendanceModalProps {
    isVisible: boolean;
    title: string;
    description: string;
    onClose: () => void;
    onApprove: () => void;
}

const ApproveModal: React.FC<ApproveAttendanceModalProps> = ({
    isVisible,
    title,
    description,
    onClose,
    onApprove,
}) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Approve</Text>

                    <Text style={styles.modalMessage}>
                        {title}
                    </Text>

                    <Text style={styles.modalDescription}>
                        {description}
                    </Text>

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.approveButton]}
                            onPress={onApprove}
                        >
                            <Text style={styles.approveButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center', // Center-align content
    },
    modalTitle: {
        ...textStyle.bold20,
        color: colors.success,
        marginBottom: 12,
        textAlign: 'center',
    },
    modalMessage: {
        ...textStyle.semibold14,
        color: colors.black,
        marginBottom: 10,
    },
    modalDescription: {
        ...textStyle.regular12,
        color: colors.gray2,
        marginBottom: 20,
    },
    buttonGroup: {
        width: '100%',
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    approveButton: {
        borderBottomWidth: 1,
        borderBottomColor: colors.offWhite5,
    },
    approveButtonText: {
        ...textStyle.semibold14,
        color: colors.success,
    },
    closeButtonText: {
        ...textStyle.semibold14,
        color: colors.gray1,
    },
});




export default ApproveModal;
