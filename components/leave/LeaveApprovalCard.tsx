import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { LeaveApprovalRequest } from '../../typeInterfaces/LeaveApprovalRequest';
import moment from 'moment';
import { BASE_URL } from '../../Server';
import shadowStyles from '../../utils/shadowStyles';
import { generateLeaveType, getLeaveStatusText } from '../../utils/leaveUtils';

interface LeaveApprovalCardProps {
    leaveApproval: LeaveApprovalRequest; // The leave approval object
    onApprove: () => void; // Callback for approve action
    onReject: () => void; // Callback for reject action
    onViewDetails: () => void; // Callback for view details
}

const LeaveApprovalCard: React.FC<LeaveApprovalCardProps> = ({
    leaveApproval,
    onApprove,
    onReject,
    onViewDetails,
}) => {
    const {
        leaveType: title,
        startDate,
        endDate,
        duration: days,
        senderFirstName,
        senderLastName,
        designationName: employeeDesignation,
        senderPhoto: employeeImage,
        isAccepted: status,
    } = leaveApproval;
    const employeeName = `${senderFirstName} ${senderLastName}`;

    const getStatusStyle = () => {
        switch (status) {
            case 0:
                return styles?.pending; // Pending status
            case 1:
                return styles?.success; // Success/Approved status
            case 2:
                return styles?.reject; // Rejected status
            default:
                return {}; // Optional: Default fallback style
        }
    };


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
                    <Text style={styles.days}>{`${days} Days`}</Text>
                </View>

                {/* Status */}
                <View style={styles?.statusContainer}>
                    <Text style={getStatusStyle()}>{getLeaveStatusText(status)}</Text>
                </View>
            </View>

            {/* Employee Container */}
            <View style={styles.employeeContainer}>
                {/* Employee Details */}
                <View style={styles.employeeInfo}>
                    {employeeImage ? (
                        <Image
                            source={{ uri: `${BASE_URL?.baseApi}/${employeeImage}` }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>{employeeName?.charAt(0) || 'U'}</Text>
                        </View>
                    )}
                    <View>
                        <Text style={styles.employeeName}>{employeeName}</Text>
                        <Text style={styles.employeeDesignation}>{employeeDesignation}</Text>
                    </View>
                </View>

                {/* Actions - Only valid while pending */}
                {status === 0 && (
                    <View style={styles.actions}>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                onReject();
                            }}
                            style={styles.rejectButton}
                        >
                            <Icon name="x" size={16} color={colors.black} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                onApprove();
                            }}
                            style={styles.approveButton}
                        >
                            <Icon name="check" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                )}
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
    employeeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
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

export default LeaveApprovalCard;

