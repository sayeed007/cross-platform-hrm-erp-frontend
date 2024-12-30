import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

interface CancelModalProps {
    title: string;
    description: string;
    isVisible: boolean;
    onClose: () => void;
    onCancel: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({
    title,
    description,
    isVisible,
    onClose,
    onCancel,
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
                    <Text style={styles.modalTitle}>Cancel</Text>

                    <Text style={styles.modalMessage}>{title}</Text>
                    <Text style={styles.modalDescription}>{description}</Text>


                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.rejectButtonText}>Yes</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        ...textStyle.bold20,
        color: colors.error,
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
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.offWhite4,
        borderRadius: 8,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        color: colors.black,
        backgroundColor: colors.offWhite1,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: 5,
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
    rejectButton: {
        borderBottomWidth: 1,
        borderBottomColor: colors.offWhite5,
    },
    rejectButtonText: {
        ...textStyle.semibold14,
        color: colors.red,
    },
    closeButtonText: {
        ...textStyle.semibold14,
        color: colors.gray1,
    },
    reasonText: {
        flexDirection: "row",
        ...textStyle.regular14,
        color: colors.gray3,
        marginBottom: 10,
        position: 'relative',
    },
    reasonIcon: {
        color: colors.red,
        marginLeft: 5,
    },
    reasonLength: {
        ...textStyle.regular14,
        color: colors.gray1,
        marginTop: 5,
    }
});

export default CancelModal;
