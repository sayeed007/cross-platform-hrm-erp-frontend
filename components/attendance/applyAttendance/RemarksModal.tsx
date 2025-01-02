import { LinearGradient } from "expo-linear-gradient";
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react';
import {
    Keyboard,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';

interface RemarksModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (remarks: string) => void;
    selectedDate: string;
    selectedInTime: string;
    selectedOutTime: string;
    updatedStatus: string;
    editReason: string;
}

const RemarksModal: React.FC<RemarksModalProps> = ({
    isVisible,
    onClose,
    onSubmit,
    selectedDate,
    selectedInTime,
    selectedOutTime,
    updatedStatus,
    editReason
}) => {

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues: { remarks: editReason },
        validationSchema: Yup.object().shape({
            remarks: Yup.string()
                .required('Remarks is required')
                .max(255, 'Remarks must be less than 255 characters'),
        }),
        onSubmit: (values) => {
            Keyboard.dismiss();
            onSubmit(values.remarks);
        },
    });

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={false} // Make the modal full-page
            onRequestClose={onClose}
        >

            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.modalContainer}>

                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="arrow-left" size={24} color={colors.gray1} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>
                            Please Add Remark
                        </Text>
                        <View />
                    </View>

                    {/* Textarea for Remarks */}
                    <View style={styles.remarks}>
                        <Text style={styles.remarksText}>
                            Remarks
                        </Text>
                        <TextInput
                            style={[
                                styles.textarea,
                                touched.remarks && errors.remarks ? styles.textareaError : null,
                            ]}
                            multiline
                            numberOfLines={4}
                            placeholder="Enter your remarks"
                            placeholderTextColor={colors.gray2}
                            value={values.remarks}
                            onChangeText={handleChange('remarks')}
                            autoFocus // This will focus the input when the modal opens
                        />

                        {/* Error Message */}
                        {touched.remarks && errors.remarks && (
                            <Text style={styles.errorText}>{errors.remarks}</Text>
                        )}

                        {/* Character Counter */}
                        <Text style={styles.charCount}>
                            {values.remarks.length}/255
                        </Text>
                    </View>


                    {/* Date */}
                    <View style={styles.marginTop15}>
                        <Text style={styles.title}>
                            Date
                        </Text>
                        <Text style={styles.value}>
                            {moment(selectedDate).format('ddd, MMM DD, YYYY')}
                        </Text>
                    </View>

                    {/* IN & OUT TIME */}
                    <View style={styles.InOutTimeContainer}>
                        <View style={styles.InOutTimeContainerItem}>
                            <Text style={styles.title}>
                                In Time
                            </Text>
                            <Text style={styles.value}>
                                {moment(selectedInTime, 'HH:mm').format('h:mm a')}
                            </Text>
                        </View>

                        <View style={styles.InOutTimeContainerItem}>
                            <Text style={styles.title}>
                                Out Time
                            </Text>
                            <Text style={styles.value}>
                                {moment(selectedOutTime, 'HH:mm').format('h:mm a')}
                            </Text>
                        </View>
                    </View>

                    {/* Reason */}
                    <View style={styles.marginTop15}>
                        <Text style={styles.title}>
                            Reason
                        </Text>
                        <Text style={styles.value}>
                            {updatedStatus}
                        </Text>
                    </View>

                    {/* Footer with Buttons */}

                    <TouchableOpacity onPress={() => handleSubmit()}>
                        <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: Platform.OS === 'android' ? 30 : 10,
    },
    modalContainer: {
        padding: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerTitle: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    remarks: {
        width: '100%',
    },
    remarksText: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    textarea: {
        height: 120,
        borderWidth: 1,
        backgroundColor: colors.offWhite1,
        borderRadius: 8,
        padding: 8,
        textAlignVertical: 'top',
        color: colors.black,
        ...textStyle.regular16,
    },
    textareaError: {
        borderColor: colors.red,
    },
    errorText: {
        ...textStyle.regular12,
        color: colors.red,
        marginTop: 4,
    },
    charCount: {
        ...textStyle.regular12,
        marginTop: 8,
        color: colors.gray2,
        textAlign: 'right',
    },
    footer: {
        padding: 16,
    },
    submitButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        ...textStyle.regular16,
        color: colors.white,
    },
    title: {
        ...textStyle.regular12,
        color: colors.gray2,
    },
    value: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    InOutTimeContainer: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        marginTop: 15
    },
    InOutTimeContainerItem: {
        width: '48%'
    },
    marginTop15: {
        marginTop: 15
    }
});

export default RemarksModal;
