import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';
import { useUser } from '../../../context/UserContext';
import * as DocumentPicker from 'expo-document-picker';
import shadowStyles from '../../../utils/shadowStyles';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import LeaveSummary from './LeaveSummary';
import { GenerateAndViewIcon } from '../../common/GenerateAndSHowIcon';


interface GiveReasonAndDocumentProps {
    selectedLeaveType: string;
    startDate: string;
    endDate: string;
    leaveDays: number;
    leavePeriod: string;
    isLfaEncashment: boolean;
    leaveReason: string;
    setLeaveReason: (reason: string) => void;
    leaveFile: File | string | null;
    setLeaveFile: (file: File | null) => void;
    onNext: () => void; // Callback for the Next button
};

interface LeaveFormValues {
    leaveType: string;
    leaveReason: string;
    leaveFile: File | null | string;
};

const noReasonNeededLeaveType = ['annual', 'lfa'];

const GiveReasonAndDocument: React.FC<GiveReasonAndDocumentProps> = ({
    selectedLeaveType,
    startDate,
    endDate,
    leaveDays,
    leavePeriod,
    isLfaEncashment,
    leaveReason,
    setLeaveReason,
    leaveFile,
    setLeaveFile,
    onNext,
}) => {
    const { user } = useUser();
    const configurableLeaves = [...(user?.employeeInfo?.leavePolicy?.configurableLeaves || [])];
    const leaveConfig = configurableLeaves.find(
        (leave) => leave.leaveType === selectedLeaveType
    );

    const leaveInfoText = leaveConfig?.leaveDeduction === "CALENDAR_DAYS"
        ? "Government holiday and weekend will be counted as leave days."
        : "Government holiday and weekend will not be counted as leave days.";

    const leaveDurationText = leaveConfig?.leaveDeduction?.replace("_", " ") || "N/A";

    const {
        handleChange,
        handleSubmit,
        values,
        setValues,
        errors,
        touched,
    } = useFormik<LeaveFormValues>({
        initialValues: {
            leaveType: selectedLeaveType,
            leaveReason: leaveReason,
            leaveFile: leaveFile,
        },
        validationSchema: Yup.object().shape({
            leaveReason: Yup.string()
                .when('leaveType', {
                    is: (value: string) => value !== 'annual' && value !== 'lfa',
                    then: () =>
                        Yup.string()
                            .required('Leave Reason is required')
                            .max(255, 'Leave Reason must be less than 255 characters'),
                }),
            leaveFile: Yup.mixed().test(
                'is-file-empty',
                'Attachment is required.',
                (value) =>
                    !(leaveDays >= (leaveConfig?.minLeaveDaysAttachmentToBeRequired ?? 0) &&
                        !value &&
                        leaveConfig?.attachmentRequired)
            ).nullable(),
        }),
        validateOnMount: true,
        onSubmit: () => {
            onNext();
        },
    });

    const handleDocumentSelection = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/jpeg', 'application/msword'],
            });

            if (!result.canceled) {
                // Handle the image result
                const uri: string = result.assets[0].uri;
                // Set the image URI in state or upload it
                setValues({
                    ...values,
                    leaveFile: uri
                });

                if (result?.assets?.[0]?.file) {
                    setLeaveFile(result?.assets?.[0]?.file);
                }
            }
        } catch (error) {
            console.error('Error selecting document:', error);
        }
    };

    const handleRemoveFile = () => {
        setLeaveFile(null);
    };

    return (
        <>
            {/* Textarea for Leave Reason */}
            {!noReasonNeededLeaveType?.includes(selectedLeaveType) &&
                <View style={styles.reason}>
                    <Text style={styles.reasonText}>Leave Reason</Text>

                    <TextInput
                        id='leaveReason'
                        style={[
                            styles.textarea,
                            touched.leaveReason && errors.leaveReason ? styles.textareaError : null,
                        ]}
                        multiline
                        numberOfLines={4}
                        placeholder="Enter your leave reason"
                        placeholderTextColor={colors.gray2}
                        value={values.leaveReason}
                        onChangeText={(text) => {
                            setValues({
                                ...values,
                                leaveReason: text
                            });
                            setLeaveReason(text);
                        }}
                        autoFocus
                    />

                    <View style={styles.footerItems}>
                        {/* Error Message */}
                        {touched.leaveReason && errors.leaveReason ? (
                            <Text style={styles.errorText}>{errors.leaveReason}</Text>
                        ) : (
                            <Text></Text>
                        )}

                        {/* Character Counter */}
                        <Text style={styles.charCount}>{values.leaveReason.length}/255</Text>
                    </View>
                </View>
            }

            {/* Attach a Document Section */}
            {(leaveConfig?.attachmentRequired && (leaveDays >= leaveConfig?.minLeaveDaysAttachmentToBeRequired)) &&
                <View style={styles.documentContainer}>
                    <Text style={styles.documentLabel}>Attach a Document*</Text>
                    <TouchableOpacity
                        style={styles.uploadBox}
                        onPress={handleDocumentSelection}
                    >
                        <GenerateAndViewIcon
                                iconName="FolderNotchOpen"
                                size={36}
                            />
                        <Text style={styles.uploadText}>Click here to upload file</Text>
                        <Text style={styles.supportedText}>
                            Supported files are JPEG, DOC, PDF
                        </Text>
                    </TouchableOpacity>

                    {/* Show selected document */}
                    {leaveFile &&
                        <View style={styles.fileContainer}>
                            <GenerateAndViewIcon
                                iconName="FolderNotchOpen"
                                size={36}
                            />
                            <Text style={styles.fileName}>{typeof leaveFile === 'object' && 'name' in leaveFile ? leaveFile.name : ''}</Text>
                            <TouchableOpacity onPress={handleRemoveFile}>
                                <GenerateAndViewIcon
                                    iconName="reject"
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    }

                    {/* Error Message */}
                    {touched.leaveFile && errors.leaveFile && (
                        <Text style={styles.errorText}>{errors.leaveFile}</Text>
                    )}
                </View>
            }


            {/* LEAVE TYPE */}
            <View style={styles.marginTop15}>
                <Text style={styles.title}>
                    Leave Type
                </Text>
                <Text style={styles.value}>
                    {capitalizeFirstLetter(selectedLeaveType)}
                </Text>
            </View>

            {/* LEAVE DURATION SUMMARY */}
            <LeaveSummary
                startDate={startDate}
                endDate={endDate}
                leaveDays={leaveDays}
                leaveInfoText={leaveInfoText}
                leaveDurationText={leaveDurationText}
            />

            {/* HALF DAY LEAVE  */}
            {leaveConfig?.halfDayAllowed &&
                <View style={styles.marginTop15}>
                    <Text style={styles.title}>
                        Want to apply Half day
                    </Text>
                    <Text style={styles.value}>
                        {leavePeriod === 'HALF_DAY' ? 'Yes' : 'No'}
                    </Text>
                </View>
            }

            {/* ENCASHMENT LEAVE */}
            {selectedLeaveType === 'lfa' &&
                <View style={styles.marginTop15}>
                    <Text style={styles.title}>
                        Want to encash with these leave (You can apply LFA encashment for one time)
                    </Text>
                    <Text style={styles.value}>
                        {isLfaEncashment ? 'Yes' : 'No'}
                    </Text>
                </View>
            }

            {/* Next Button */}
            <TouchableOpacity
                disabled={((errors.leaveReason || errors.leaveFile) ? true : false)}
                onPress={() => handleSubmit()}
            >
                <LinearGradient
                    colors={
                        ((errors.leaveReason || errors.leaveFile) ? true : false)
                            ? [colors.offWhite4, colors.offWhite5]
                            : [colors.cardGradient[0], colors.cardGradient[1]]
                    }
                    style={styles.nextButton}
                >
                    <Text style={styles.nextButtonText}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    reason: {
        width: '100%',
        marginBottom: 10,
    },
    reasonText: {
        ...textStyle.semibold16,
        color: colors.black,
        marginBottom: 8,
    },
    textarea: {
        height: 120,
        borderWidth: 1,
        borderColor: colors.gray3,
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
    footerItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
    },
    documentContainer: {
        marginBottom: 10,
    },
    documentLabel: {
        ...textStyle.semibold16,
        color: colors.black,
        marginBottom: 8,
    },
    uploadBox: {
        height: 120,
        borderWidth: 1,
        borderColor: colors.gray3,
        backgroundColor: colors.offWhite1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        ...textStyle.semibold14,
        color: colors.black,
        marginTop: 8,
    },
    supportedText: {
        ...textStyle.regular12,
        color: colors.gray2,
    },
    selectedDocument: {
        marginTop: 8,
    },
    selectedDocumentText: {
        ...textStyle.regular14,
        color: colors.info,
    },
    nextButton: {
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextButtonText: {
        ...textStyle.semibold16,
        color: colors.white,
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: colors.white,
        borderRadius: 8,
        marginTop: 10,
        ...shadowStyles.popUpShadow2
    },
    fileName: {
        flex: 1,
        marginHorizontal: 8,
        ...textStyle.medium14,
        color: colors.black,
    },
    marginTop15: {
        marginTop: 15
    },
    title: {
        ...textStyle.regular12,
        color: colors.gray2,
    },
    value: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    optionText: {
        ...textStyle.medium14,
        color: colors.gray2,
        marginLeft: 8,
    },
});

export default GiveReasonAndDocument;
