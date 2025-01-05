import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { useUser } from '../../context/UserContext';
import { getEmployeeAttendanceForClocking } from '../../apis/HomeScreen';
import moment from 'moment';
import { UserAttendanceInformationForClocking } from '../../typeInterfaces/UserAttendanceInformationForClocking';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

const presentStatus = ['present', 'late'];

const AttendanceCard = () => {
    const { user } = useUser();


    const [userAttendanceInformationForClocking, setUserAttendanceInformationForClocking] = useState<UserAttendanceInformationForClocking | null>(null);

    useEffect(() => {
        if (user?.employeeId) {
            const currentTime = Date.now();

            getEmployeeAttendanceForClocking(user?.employeeId, currentTime).then((clockingResponse) => {
                if (clockingResponse?.[0]) {
                    setUserAttendanceInformationForClocking({ ...clockingResponse[0] });
                } else {

                }
            })
        }
    }, [user?.employeeId]);

    const getTodaysLastCheckedInTime = () => {
        const finalInTime = userAttendanceInformationForClocking?.attendance?.isInTimeEdited ?
            userAttendanceInformationForClocking?.attendance?.updatedInTime
            :
            userAttendanceInformationForClocking?.attendance?.inTime ?
                userAttendanceInformationForClocking?.attendance?.inTime
                :
                moment('00:00:00', 'hh:mm:ss');  // Use current time if inTime is null

        // Parse the date string
        const date = moment(finalInTime, 'YYYY-MM-DD HH:mm:ss');

        // Format the date into the desired pattern
        if (presentStatus?.includes(userAttendanceInformationForClocking?.attendance?.status ?? '')) {
            return date.format('hh:mm:ss A');
        } else {
            return 'N/A';
        }

    };

    return (
        <View style={styles.attendanceCard}>
            <Text style={styles.attendanceTitle}>
                Today’s In Time
            </Text>
            <Text style={styles.attendanceTime}>
                {getTodaysLastCheckedInTime()}
            </Text>
            <Text style={styles.attendanceDetails}>
                {userAttendanceInformationForClocking?.attendanceRoaster?.roasterType === 'REGULAR' ? 'General Roster' : 'Shift Roster'}
                &nbsp;
                ({userAttendanceInformationForClocking?.attendanceRoaster?.shiftName}{userAttendanceInformationForClocking?.attendanceRoaster?.roasterType !== 'REGULAR' && `- ${userAttendanceInformationForClocking?.attendance?.attendanceAdditionalInfo?.shiftName}`}): {moment(userAttendanceInformationForClocking?.attendance?.attendanceAdditionalInfo?.shiftStartTime, 'HH:mm:ss').format('hh:mm A')} to {moment(userAttendanceInformationForClocking?.attendance?.attendanceAdditionalInfo?.shiftEndTime, 'HH:mm:ss').format('hh:mm A')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    attendanceCard: {
        backgroundColor: colors?.white,
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flex: 1,
        width: Platform.OS === 'web' ? '92%' : '100%',
        top: -85,
        left: '4%',
        height: 175,
    },
    attendanceTitle: {
        ...textStyle?.bold16,
        color: colors?.gray2,
    },
    attendanceTime: {
        ...textStyle?.bold48,
        color: colors?.gray4,
    },
    attendanceDetails: {
        ...textStyle?.regular14,
        color: colors?.gray3,
    },
})

export default AttendanceCard
