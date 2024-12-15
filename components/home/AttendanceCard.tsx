import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useUser } from '../../context/UserContext';
import { getEmployeeAttendanceForClocking } from '../../apis/HomeScreen';
import moment from 'moment';
import { UserAttendanceInformationForClocking } from '../../typeInterfaces/UserAttendanceInformationForClocking';

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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flex: 1,
        width: '96%',
        top: -70,
        left: '2%',
    },
    attendanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#637381',
    },
    attendanceTime: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#1D1E25',
    },
    attendanceDetails: {
        fontSize: 14,
        color: '#637381',
    },
})

export default AttendanceCard
