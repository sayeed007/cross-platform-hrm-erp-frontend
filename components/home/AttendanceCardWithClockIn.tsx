import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useUser } from '../../context/UserContext';
import { getEmployeeAttendanceForClocking, modifyAttendanceClockInOut } from '../../apis/HomeScreen';
import { UserAttendanceInformationForClocking } from '../../typeInterfaces/UserAttendanceInformationForClocking';
import { Attendance, defaultAttendance } from '../../typeInterfaces/Attendance';
import moment from 'moment';
import ModalLoader from '../common/ModalLoader';
import Geolocation from 'react-native-geolocation-service';
import { useSuccessModal } from '../../context/SuccessModalProvider';
import { useErrorModal } from '../../context/ErrorModalProvider';
import { ModifyAttendanceClockInOutFormData } from '../../typeInterfaces/ModifyAttendanceClockInOutFormData';


const AttendanceCardWithClockIn: React.FC = () => {

    const { user } = useUser();
    const { showSuccess } = useSuccessModal();
    const { showError } = useErrorModal();

    const [refetchData, setRefetchData] = useState(false);
    const [loader, setLoader] = useState(false);
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
    }, [user?.employeeId, refetchData]);


    const getTodaysTotalTime = (): string => {
        const finalInTime = userAttendanceInformationForClocking?.attendance?.isInTimeEdited
            ? userAttendanceInformationForClocking?.attendance?.updatedInTime
            : userAttendanceInformationForClocking?.attendance?.inTime
                ? userAttendanceInformationForClocking?.attendance?.inTime
                : moment('00:00:00', 'HH:mm:ss'); // Default to "00:00:00" if inTime is null

        const finalOutTime = userAttendanceInformationForClocking?.attendance?.isOutTimeEdited
            ? userAttendanceInformationForClocking?.attendance?.updatedOutTime
            : userAttendanceInformationForClocking?.attendance?.outTime
                ? userAttendanceInformationForClocking?.attendance?.outTime
                : moment('00:00:00', 'HH:mm:ss'); // Default to "00:00:00" if outTime is null

        // Parse the in and out times
        const inTime = moment(finalInTime);
        const outTime = moment(finalOutTime);

        // Calculate the difference in milliseconds
        const duration = moment.duration(outTime.diff(inTime));

        // Extract hours, minutes, and seconds
        const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
        const minutes = duration.minutes().toString().padStart(2, '0');
        const seconds = duration.seconds().toString().padStart(2, '0');

        // Return formatted time difference
        return `${hours}:${minutes}:${seconds}`;
    };

    const checkIsInTimeEdited = (attendance: Attendance) => {
        if ((attendance?.isInTimeEdited !== null && attendance?.isInTimeEdited) || attendance?.inTime !== null) {
            return true;
        } else {
            return false;
        }
    };

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
        return date.format('hh:mm A');

    };

    const getLastCheckedOutTime = () => {
        const finalOutTime = userAttendanceInformationForClocking?.lastAttendanceWithInTime?.isOutTimeEdited ?
            userAttendanceInformationForClocking?.lastAttendanceWithInTime?.updatedOutTime
            :
            userAttendanceInformationForClocking?.lastAttendanceWithInTime?.outTime ?
                userAttendanceInformationForClocking?.lastAttendanceWithInTime?.outTime
                :
                moment('00:00:00', 'hh:mm:ss');  // Use current time if inTime is null

        // Parse the date string
        const date = moment(finalOutTime, 'YYYY-MM-DD HH:mm:ss');

        // Format the date into the desired pattern
        return date.format('MMM D [at] hh:mm A');

    };

    const doesInTimeExist = (attendance: Attendance) => {
        if (attendance?.inTime !== null || (attendance?.isInTimeEdited === true && attendance?.updatedInTime !== null)) {
            return true;
        }
        return false;
    };

    const isAlreadyCheckedInToday = () => {
        return (
            (userAttendanceInformationForClocking?.attendance?.updatedStatus === 'Clocked Out' || doesInTimeExist(userAttendanceInformationForClocking?.attendance ?? defaultAttendance))
        )
    };

    const currentBrowserTime = async () => {
        try {
            // Get the current time in the browser's local timezone using Moment.js 
            const currentTime = moment();
            return {
                millis: currentTime.valueOf(),
                readable: currentTime.format('YYYY-MM-DD HH:mm:ss'),
            };
        } catch (error) {
            console.error('Failed to fetch the current time:', error);
            return null;
        }
    };

    const sendCheckInWithoutLocation = async () => {
        setLoader(true);
        const currentTime = await currentBrowserTime();

        const submittableData: ModifyAttendanceClockInOutFormData = {
            employeeId: user?.employeeId,
            punchTimeInMillis: currentTime?.millis,
            latitude: null, // or any default value you want to use when location is not available
            longitude: null, // or any default value you want to use when location is not available
        };

        modifyAttendanceClockInOut(submittableData).then((checkInResponse) => {
            setLoader(false);
            if (checkInResponse?.[0]) {
                setRefetchData(!refetchData);
                showSuccess('Attendance is successfully updated without geolocation.');
            } else {
                showError(checkInResponse?.[1]);
            }
        });

    };

    const performCheckInOut = async () => {
        setLoader(true);
        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const currentTime = await currentBrowserTime();

                    const submittableData: ModifyAttendanceClockInOutFormData = {
                        employeeId: user?.employeeId,
                        punchTimeInMillis: currentTime?.millis,
                        latitude: latitude,
                        longitude: longitude,
                    };

                    modifyAttendanceClockInOut(submittableData).then((checkInResponse) => {
                        setLoader(false);
                        if (checkInResponse?.[0]) {
                            setRefetchData(!refetchData);
                            showSuccess('Attendance is successfully updated.');
                        } else {
                            showError(checkInResponse?.[1]);
                        }
                    });

                } catch (error) {
                    console.error('Error during attendance submission:', error);
                    setLoader(false);
                    showError('An error occurred. Please try again.');
                }
            },
            (error) => {
                setLoader(false);
                console.warn('Geolocation error:', error);

                // Handle errors, e.g., user denied location access
                if (error.code === 1) {
                    showError('Location Error, Location permission denied.');
                } else if (error.code === 2) {
                    showError('Location Error, Location unavailable.');
                } else if (error.code === 3) {
                    showError('Location Error, Location request timed out.');
                }

                // Fallback to check-in without location
                sendCheckInWithoutLocation();
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    };

    return (
        <>
            {loader &&
                <ModalLoader
                    visible={true}
                    message="Requesting for clock in/out."
                    color="#10B981"
                    backgroundOpacity={0.6}
                />
            }


            <View style={styles.attendanceCardWithClock}>
                {/* Image/Icon */}
                <View style={styles.imageContainer}>
                    {isAlreadyCheckedInToday() ?
                        (
                            <>
                                <View style={styles.timerContainer}>
                                    {getTodaysTotalTime().split(':').map((timeSegment, index) => (
                                        <React.Fragment key={index}>
                                            <Text style={styles.timerText}>{timeSegment}</Text>
                                            {index < 2 && <Text style={styles.colon}>:</Text>}
                                        </React.Fragment>
                                    ))}
                                </View>


                                <TouchableOpacity
                                    style={[styles.button, styles.checkOutButton]}
                                    onPress={() => performCheckInOut()}
                                >
                                    <View style={styles.buttonWithTextContainer}>
                                        <Image
                                            source={require('../../assets/images/Fingerprint.png')}
                                            style={styles.smallImage}
                                        />

                                        <Text style={styles.buttonText}>
                                            Check Out
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View>
                                    <Text style={styles.checkedInTimeText}>
                                        {checkIsInTimeEdited(userAttendanceInformationForClocking?.attendance ?? defaultAttendance) ?
                                            `Today's checked in: ${getTodaysLastCheckedInTime()}`
                                            :
                                            `Last Checked out: ${getLastCheckedOutTime()}`
                                        }
                                    </Text>
                                </View>


                            </>
                        ) :
                        (
                            <>
                                <Image
                                    source={require('../../assets/images/AttendanceClock.png')}
                                    style={styles.image}
                                    resizeMode='contain'
                                />

                                <Text style={styles.checkInStatusText}>Yet to check in</Text>

                                <TouchableOpacity
                                    style={[styles.button, styles.checkInButton]}
                                    onPress={() => performCheckInOut()}
                                >
                                    <View style={styles.buttonWithTextContainer}>
                                        <Image
                                            source={require('../../assets/images/Fingerprint.png')}
                                            style={styles.smallImage}
                                            resizeMode='contain'
                                        />

                                        <Text style={styles.buttonText}>
                                            Check In
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {/* Shift Time */}
                                <Text style={styles.attendanceDetails}>
                                    {userAttendanceInformationForClocking?.attendanceRoaster?.roasterType === 'REGULAR' ? 'General Roster' : 'Shift Roster'}
                                    &nbsp;
                                    ({userAttendanceInformationForClocking?.attendanceRoaster?.shiftName}{userAttendanceInformationForClocking?.attendanceRoaster?.roasterType !== 'REGULAR' && `- ${userAttendanceInformationForClocking?.attendance?.attendanceAdditionalInfo?.shiftName}`}): {moment(userAttendanceInformationForClocking?.attendance?.attendanceAdditionalInfo?.shiftStartTime, 'HH:mm:ss').format('hh:mm A')} to {moment(userAttendanceInformationForClocking?.attendance?.attendanceAdditionalInfo?.shiftEndTime, 'HH:mm:ss').format('hh:mm A')}
                                </Text>
                            </>
                        )}
                </View>

            </View>

        </>

    );
};

// Styles
const styles = StyleSheet.create({
    attendanceCardWithClock: {
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
        width: '100%',
        top: -70,
        left: '4%',
    },
    imageContainer: {
        marginBottom: 12,
    },
    buttonWithTextContainer: {
        flexDirection: 'row',
        margin: 'auto'
    },
    image: {
        width: 100,
        height: 100,
        margin: 'auto'
    },
    smallImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1F2937',
        backgroundColor: '#F4F6F8',
        height: 62,
        width: 62,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    colon: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1F2937',
        marginHorizontal: 4,
    },
    checkInStatusText: {
        fontSize: 16,
        color: '#DC2626',
        marginBottom: 8,
        margin: 'auto'
    },
    checkedInTimeText: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 8,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '70%',
        marginHorizontal: 'auto',
        marginVertical: 20,
    },
    checkInButton: {
        backgroundColor: '#10B981', // Green background
        shadowColor: '#0D8050', // Slightly darker green for contrast
        shadowOffset: { width: 0, height: 4 }, // Larger offset for more visible shadow
        shadowOpacity: 0.6, // Increase opacity for more prominent shadow
        shadowRadius: 6, // Larger blur radius for a smoother shadow
        elevation: 10, // Higher elevation for Android
    },
    checkOutButton: {
        backgroundColor: '#F97316', // Orange background
        shadowColor: '#D9630E', // Slightly darker orange for contrast
        shadowOffset: { width: 0, height: 4 }, // Larger offset for more visible shadow
        shadowOpacity: 0.6, // Increase opacity for more prominent shadow
        shadowRadius: 6, // Larger blur radius for a smoother shadow
        elevation: 10, // Higher elevation for Android
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    shiftText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
    },
    attendanceDetails: {
        fontSize: 14,
        color: '#637381',
    },
    centeredText: {
        margin: 'auto'
    }
});

export default AttendanceCardWithClockIn;
