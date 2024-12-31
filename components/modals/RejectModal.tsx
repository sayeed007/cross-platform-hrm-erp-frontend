import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

interface RejectAttendanceModalProps {
    isVisible: boolean;
    title: string;
    description: string;
    reason?: string; // Managed by parent
    isReasonNeeded?: boolean;
    onClose: () => void;
    onReject: (reason: string) => void; // Pass reason back to parent
    setReason?: (value: string) => void; // Update reason in parent
}

const RejectAttendanceModal: React.FC<RejectAttendanceModalProps> = ({
    isVisible,
    title,
    description,
    reason,
    isReasonNeeded,
    onClose,
    onReject,
    setReason,
}) => {

    const { handleChange, handleSubmit, values, errors, touched, } = useFormik({
        initialValues: { reason: reason ?? '' },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            reason: isReasonNeeded
                ? Yup.string().required('Reason is required')
                : Yup.string(),
        }),
        onSubmit: (value) => {
            onReject(values?.reason);
        },
    });

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Reject</Text>

                    <Text style={styles.modalMessage}>{title}</Text>
                    <Text style={styles.modalDescription}>{description}</Text>

                    {isReasonNeeded && (
                        <View style={styles.inputContainer}>
                            <View style={styles.reasonText}>
                                <Text>Reason</Text>
                                <Text style={styles.reasonIcon}>*</Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.textInput,
                                    (errors.reason && touched.reason)
                                        ? styles.inputError
                                        : {},
                                ]}
                                placeholder="Write reason here"
                                placeholderTextColor={colors.gray2}
                                value={values.reason}
                                onChangeText={(text) => {
                                    handleChange('reason')(text);
                                    setReason && setReason(text);
                                }}
                                multiline
                            />
                            {errors.reason && touched.reason && (
                                <Text style={styles.errorText}>
                                    {errors.reason}
                                </Text>
                            )}

                            <Text style={styles.reasonLength}>
                                {values?.reason?.length}/255
                            </Text>
                        </View>
                    )}


                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => handleSubmit()}
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

export default RejectAttendanceModal;
