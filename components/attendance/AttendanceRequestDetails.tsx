import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { AttendanceRecord } from '../../typeInterfaces/AttendanceRequestApproval';
import { colors } from "../../utils/colors";
import { generateLeaveType } from "../../utils/leaveUtils";
import { textStyle } from "../../utils/textStyle";
import EmployeeAvatar from "../common/EmployeeAvatar";
import { FileDownload } from "../common/FileDownload";
import { GenerateAndViewIcon } from '../common/GenerateAndSHowIcon';

interface AttendanceRequestDetailsProps {
    isVisible: boolean;
    attendanceRequestDetails: Partial<AttendanceRecord>;
    onClose: () => void;
    onApprove: () => void;
    onReject: () => void;
}

type Time = string | null;

const AttendanceRequestDetails: React.FC<AttendanceRequestDetailsProps> = ({
    isVisible,
    attendanceRequestDetails,
    onClose,
    onApprove,
    onReject,
}) => {

    const {
        firstName,
        lastName,
        employeeVisibleId,
        designationName,
        departmentName,
        date,
        inTime,
        updatedInTime,
        outTime,
        updatedOutTime,
        lateTimeDiff,
        editReason: reason,
        updatedStatus: remarks,
        isAcceptedByLM,
        isRejectedByLM,
    } = attendanceRequestDetails;
    const senderImage = null;
    const totalHour = 0;


    const formatTime = (inTime: Time) => {
        if (!inTime) {
            return 'N/A'; // Return 'N/A' if the time is null
        }

        // Format the time using moment
        return moment(inTime, ['HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']).format('HH:mm:ss');
    };

    const calculateTimeDifference = (time1: Time, time2: Time) => {
        if (!time1 || !time2) {
            return 'N/A'; // Return 'N/A' if either time is null
        }

        // Parse the times using moment
        const momentTime1 = moment(time1, ['HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);
        const momentTime2 = moment(time2, ['HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']);

        // Calculate the difference in milliseconds
        const differenceInMs = Math.abs(momentTime1.diff(momentTime2));

        // Convert the difference to HH:mm:ss format
        const duration = moment.utc(differenceInMs).format('HH:mm:ss');

        return duration;
    }


    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOuterContainer}
                onPress={onClose} // Close the modal when pressed outside
            >

                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <View style={styles.modalContent}>

                        {/* Header */}
                        <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.gradientHeader}>
                            <TouchableOpacity onPress={onClose}>
                            <GenerateAndViewIcon
                                    iconName="ArrowLeft"
                                    size={24}
                            />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Attendance Request Approval</Text>
                            <Text></Text>
                        </LinearGradient>

                        <View style={styles.modalContainerDetails}>

                            {/* User Info */}
                            <View style={styles.userInfoContainer}>
                                <EmployeeAvatar
                                    profileShowImage={senderImage ?? ''}
                                    label={`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
                                    size={100}
                                />

                                <Text style={styles.userName}>
                                    {firstName} {lastName} - {employeeVisibleId}
                                </Text>
                                <Text style={styles.userDesignation}>
                                    {departmentName} | {designationName}
                                </Text>
                            </View>

                            {/* Details */}
                            <ScrollView style={styles.detailsContainer}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Date</Text>
                                    <Text style={styles.detailValue}>
                                        {moment(date, 'YYYY-MM-DD').format('ddd, Do MMM')}
                                    </Text>
                                </View>
                                <View style={styles.detailRowDouble}>
                                    <View style={styles.detailDoubleElement}>
                                        <Text style={styles.detailLabel}>In Time</Text>
                                        <Text style={styles.detailValue}>
                                            {formatTime(inTime ?? null)}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDoubleElement}>
                                        <Text style={styles.detailLabel}>Requested In Time</Text>
                                        <Text style={styles.detailValue}>
                                            {formatTime(updatedInTime ?? null)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.detailRowDouble}>
                                    <View style={styles.detailDoubleElement}>
                                        <Text style={styles.detailLabel}>Out Time</Text>
                                        <Text style={styles.detailValue}>
                                            {formatTime(outTime ?? null)}
                                        </Text>
                                    </View>

                                    <View style={styles.detailDoubleElement}>
                                        <Text style={styles.detailLabel}>Requested Out Time</Text>
                                        <Text style={styles.detailValue}>
                                            {formatTime(updatedOutTime ?? null)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.detailRowDouble}>
                                    <View style={styles.detailDoubleElement}>
                                        <Text style={styles.detailLabel}>Late Time</Text>
                                        <Text style={styles.detailValue}>
                                            {formatTime(lateTimeDiff ?? null)}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDoubleElement}>
                                        <Text style={styles.detailLabel}>Total Hour</Text>
                                        <Text style={styles.detailValue}>
                                            {calculateTimeDifference((updatedInTime ?? null), (updatedOutTime ?? null))}
                                        </Text>
                                    </View>
                                </View>


                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Reason</Text>
                                    <Text style={styles.detailValue}>
                                        {reason}
                                    </Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Remarks</Text>
                                    <Text style={styles.detailValue}>
                                        {remarks}
                                    </Text>
                                </View>

                            </ScrollView>

                            {/* Action Buttons */}
                            {(!isAcceptedByLM && !isRejectedByLM) &&
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.rejectButton]}
                                        onPress={onReject}
                                    >
                                        <GenerateAndViewIcon
                                            iconName="reject"
                                            size={24}
                                        />
                                        <Text style={styles.rejectButtonText}>Reject</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.approveButton]}
                                        onPress={onApprove}
                                    >
                                        <GenerateAndViewIcon
                                            iconName="approve"
                                            size={24}
                                        />
                                        <Text style={styles.approveButtonText}>Approve</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        backgroundColor: colors.modalBG,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    gradientHeader: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 70,
    },
    headerText: {
        ...textStyle.regular16,
        color: colors.white,
    },
    modalContainerDetails: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        position: 'relative',
    },
    userInfoContainer: {
        alignItems: "center",
        position: 'absolute',
        top: -50,
        textAlign: 'center',
        alignSelf: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 32,
        backgroundColor: colors.gray3,
        marginBottom: 12,
    },
    userName: {
        ...textStyle.semibold16,
        color: colors.black,
        marginTop: 10,
    },
    userDesignation: {
        ...textStyle.regular13,
        color: colors.gray2,
    },
    detailsContainer: {
        marginTop: 120,
        borderTopWidth: 1,
        borderTopColor: colors.offWhite5,
        paddingTop: 15,
    },
    detailRow: {
        marginBottom: 15,
    },
    detailRowDouble: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
    },
    detailDoubleElement: {
        width: '48%',
    },
    detailLabel: {
        ...textStyle.regular14,
        color: colors.gray2,
    },
    detailValue: {
        ...textStyle.bold14,
        color: colors.black,
    },
    documentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    documentText: {
        ...textStyle.regular14,
        color: colors.black,
        marginLeft: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
        marginTop: 15,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rejectButton: {
        borderWidth: 1,
        borderColor: colors.error,
    },
    approveButton: {
        backgroundColor: colors.success,
    },
    rejectButtonText: {
        ...textStyle.semibold14,
        color: colors.error,
        marginLeft: 10
    },
    approveButtonText: {
        ...textStyle.semibold14,
        color: colors.white,
        marginLeft: 10
    },
});

export default AttendanceRequestDetails;


