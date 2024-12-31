import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../../Server';
import { AttendanceRecord } from '../../typeInterfaces/AttendanceRequestApproval';
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';
import { textStyle } from '../../utils/textStyle';

interface AttendanceRequestApprovalCardProps {
    attendanceRequestApproval: AttendanceRecord; // The attendance request approval object
    onApprove: () => void; // Callback for approve action
    onReject: () => void; // Callback for reject action
    onViewDetails: () => void; // Callback for view details
}

const AttendanceRequestApprovalCard: React.FC<AttendanceRequestApprovalCardProps> = ({
    attendanceRequestApproval,
    onApprove,
    onReject,
    onViewDetails,
}) => {
    const {
        date,
        firstName,
        lastName,
        designationName,
        isAcceptedByLM,
        isRejectedByLM,
        editReason: status
    } = attendanceRequestApproval;
    const employeeName = `${firstName} ${lastName}`;
    const employeeImage = null;


    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onViewDetails} // Trigger details page
        >
            <View style={styles.attendanceRequestContainer}>
                {/* Attendance Request Details */}
                <View style={styles.attendanceRequestInfo}>
                    <Text style={styles.title}>
                        {moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
                    </Text>
                    <Text style={styles.date}>
                        {moment(date).format('dddd')}
                    </Text>
                </View>

                {/* Status */}
                <View style={styles?.statusContainer}>
                    <Text style={styles?.status}>{status}</Text>
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
                        <Text style={styles.employeeDesignation}>{designationName}</Text>
                    </View>
                </View>

                {/* Actions - Only valid while pending */}
                {(!isAcceptedByLM && !isRejectedByLM) && (
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
    attendanceRequestContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    attendanceRequestInfo: {
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
    status: {
        color: colors?.info,
        backgroundColor: colors?.infoBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    }
});

export default AttendanceRequestApprovalCard;

