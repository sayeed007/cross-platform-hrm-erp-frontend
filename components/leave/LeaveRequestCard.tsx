import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { LeaveApprovalRequest } from '../../typeInterfaces/LeaveApprovalRequest';
import moment from 'moment';
import { BASE_URL } from '../../Server';
import shadowStyles from '../../utils/shadowStyles';
import { generateLeaveType, getLeaveStatusText, getStatusStyle } from '../../utils/leaveUtils';

interface LeaveRequestCardProps {
    leaveApproval: LeaveApprovalRequest; // The leave approval object
    // onApprove: () => void; // Callback for approve action
    // onReject: () => void; // Callback for reject action
    onViewDetails: () => void; // Callback for view details
}

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({
    leaveApproval,
    // onApprove,
    // onReject,
    onViewDetails,
}) => {
    const {
        leaveType: title,
        startDate,
        endDate,
        duration: days,
        senderFirstName,
        senderLastName,
        sendingDate,
        designationName: employeeDesignation,
        senderPhoto: employeeImage,
        isAccepted: status,
    } = leaveApproval;
    const employeeName = `${senderFirstName} ${senderLastName}`;




    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onViewDetails} // Trigger details page
        >
            <View style={styles.leaveContainer}>
                {/* Leave Details */}
                <View style={styles.leaveInfo}>
                    <Text style={styles.title}>{generateLeaveType(title)}</Text>
                    <Text style={styles.date}>
                        {`${moment(startDate).format('ddd, Do MMM')} - ${moment(endDate).format('ddd, Do MMM')}`}
                    </Text>
                </View>

                {/* Status */}
                <View style={styles?.statusContainer}>
                    <Text style={styles.days}>{`${days} Days`}</Text>
                </View>
            </View>

            {/* Employee Container */}
            <View style={styles.employeeContainer}>
                {/* Employee Details */}
                <View style={styles.sendingDate}>
                    <Text style={styles.applicationDate}>Application Date</Text>
                    <Text style={styles.applicationDateValue}>{moment(sendingDate, 'YYYY-MM-DD').format('MMM DD, YYYY')}</Text>
                </View>

                <View style={styles.actions}>
                    <Text style={getStatusStyle(status)}>{getLeaveStatusText(status)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        ...shadowStyles?.popUpShadow2
    },
    leaveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    leaveInfo: {
        marginBottom: 12,
    },
    title: {
        ...textStyle.bold16,
        color: colors.black,
        marginBottom: 4,
    },
    date: {
        ...textStyle.regular14,
        color: colors.gray3,
    },
    days: {
        color: colors.gray2,
        backgroundColor: colors.offWhite2,
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        ...textStyle.semibold14,
    },
    employeeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderColor: colors.offWhite4,
        paddingTop: 15,
    },
    sendingDate: {
    },
    applicationDate: {
        ...textStyle.regular12,
        color: colors.gray2,
    },
    applicationDateValue: {
        ...textStyle.bold14,
        color: colors.black,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.gray3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        ...textStyle.bold16,
        color: colors.white,
    },
    employeeName: {
        ...textStyle.semibold14,
        color: colors.black,
    },
    employeeDesignation: {
        ...textStyle.regular12,
        color: colors.gray2,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rejectButton: {
        backgroundColor: colors.offWhite4,
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
        width: 32,
        height: 32,
    },
    approveButton: {
        backgroundColor: colors.success,
        padding: 8,
        borderRadius: 8,
        width: 32,
        height: 32,
    },
    statusContainer: {
        position: 'absolute',
        top: 15,
        right: 0,
    },
    pending: {
        color: colors?.warning,
        backgroundColor: colors?.warningBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    },
    success: {
        color: colors?.success,
        backgroundColor: colors?.successBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    },
    reject: {
        color: colors?.error,
        backgroundColor: colors?.errorBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    }
});

export default LeaveRequestCard;

