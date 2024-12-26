import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getMonthAndYearWiseAttendanceForEmployee } from '../apis/Attendance';
import AttendanceSummaryCard from '../components/attendance/AttendanceSummaryCard';
import AttendanceTable from '../components/attendance/AttendanceTable';
import HeaderWithBackgroundImage from '../components/home/HeaderWithBackgroundImage';
import { useUser } from '../context/UserContext';
import { Attendance } from '../typeInterfaces/Attendance';
import { colors } from '../utils/colors';
import SelectMonthYearModal from '../components/attendance/SelectMonthYearModal';
import DailyAttendanceActionModal from '../components/common/DailyAttendanceActionModal';
import ApplyAttendanceModal from '../components/attendance/applyAttendance/ApplyAttendanceModal';

const notLeaveAttendanceStatus = ["AFA", "AFL", "absent", "late", "present", "half day", "holiday", "weekend"];
const cards = [
    { name: 'Absent', count: 0, color: colors.absent, bgColor: colors.absentBG },
    { name: 'Late', count: 0, color: colors.late, bgColor: colors.lateBG },
    { name: 'Leave', count: 0, color: colors.leave, bgColor: colors.leaveBG },
]

const AttendanceScreen = () => {


    const { user } = useUser();


    const [monthYearSelectionModalVisible, setMonthYearSelectionModalVisible] = useState<boolean>(false);
    const [showApplyAttendanceModalVisible, setShowApplyAttendanceModalVisible] = useState<boolean>(true);
    const [showApplyLeaveModalVisible, setShowApplyLeaveModalVisible] = useState<boolean>(false);
    const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState<string>('');
    const [selectedMonthYear, setSelectedMonthYear] = useState<string>(moment().format('MMMM, YYYY'));
    const [specificMonthAttendance, setSpecificMonthAttendance] = useState<Attendance[]>([]);
    const [filteredSpecificMonthAttendance, setFilteredSpecificMonthAttendance] = useState<Attendance[]>([]);
    const [selectedAttendance, setSelectedAttendance] = useState<Partial<Attendance>>({});
    const [summaryCards, setSummaryCards] = useState(JSON.parse(JSON.stringify(cards)));


    useEffect(() => {
        if (user?.employeeId) {
            getMonthAndYearWiseAttendanceForEmployee(user?.employeeId, selectedMonthYear).then((attendanceResponse) => {
                if (attendanceResponse?.[0]) {
                    const allAttendance = [...attendanceResponse?.[0]];
                    allAttendance.sort((a, b) => {
                        return moment(b.date).diff(moment(a.date));
                    });

                    const dummySummaryCards = JSON.parse(JSON.stringify(cards));

                    const updatedAttendance = allAttendance.map((item, index) => {
                        // Update the summary card counts based on status
                        switch (item?.status) {
                            case "AFA":
                            case "AFL":
                            case "absent":
                                dummySummaryCards[0].count += 1;
                                break;
                            case "late":
                                dummySummaryCards[1].count += 1;
                                break;
                            // No action needed for these cases
                            case "present":
                            case "half day":
                            case "holiday":
                            case "weekend":
                                break;
                            default:

                                // Any unrecognized leave type is treated as 'Other'
                                dummySummaryCards[2].count += 1;
                                break;
                        }

                        // Process and extend the attendance object
                        const inTime = item.inTime ?? "00:00:00";
                        const outTime = item.outTime ?? "00:00:00";
                        const finalInTime = item?.isEdited && item.isInTimeEdited
                            ? item.updatedInTime ?? "00:00:00"
                            : inTime;
                        const finalOutTime = item?.isEdited && item.isOutTimeEdited
                            ? item.updatedOutTime ?? "00:00:00"
                            : outTime;

                        // Calculate total hours worked
                        const totalHour = (finalInTime !== "00:00:00" && finalOutTime !== "00:00:00")
                            ? moment
                                .utc(
                                    moment(finalOutTime, "DD-MM-YYYY HH:mm:ss").diff(
                                        moment(finalInTime, "DD-MM-YYYY HH:mm:ss")
                                    )
                                )
                                .format("HH:mm:ss")
                            : "00:00:00";

                        const status = item?.sendEditRequest
                            ? "AFA"
                            : (item?.status === "unpaid"
                                ? "LWP"
                                :
                                ((item.status === 'absent' && moment().isBefore(moment(item?.attendanceRoasterStartTime ? item?.attendanceRoasterStartTime : '', 'HH:mm:ss'))
                                    && moment(item?.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'))
                                    ? 'Shift Not Started'
                                    : item.status
                                )
                            );

                        return {
                            ...item,
                            name: `${item.firstName} ${item.lastName}`,
                            inTime,
                            outTime,
                            finalInTime,
                            finalOutTime,
                            totalHour,
                            status
                        };
                    });

                    // Set the updated data
                    setSpecificMonthAttendance([...updatedAttendance]);
                    setFilteredSpecificMonthAttendance([...updatedAttendance]);

                    setSummaryCards([...dummySummaryCards]);
                } else {

                }
            })

        }
    }, [user?.employeeId, selectedMonthYear]);


    useEffect(() => {
        let dummyFilteredAttendance = [];
        switch (selectedAttendanceStatus) {
            case '':
                setFilteredSpecificMonthAttendance([...specificMonthAttendance]);
                break;
            case 'Absent':
                dummyFilteredAttendance = specificMonthAttendance.filter((attendance) =>
                    attendance.status === "absent" || attendance.status === "AFL"
                );
                setFilteredSpecificMonthAttendance([...dummyFilteredAttendance]);
                break;
            case 'Late':
                dummyFilteredAttendance = specificMonthAttendance.filter((attendance) =>
                    attendance.status === "late"
                );
                setFilteredSpecificMonthAttendance([...dummyFilteredAttendance]);
                break;
            case 'Leave':
                dummyFilteredAttendance = specificMonthAttendance.filter((attendance) =>
                    !notLeaveAttendanceStatus?.includes(attendance.status)
                );
                setFilteredSpecificMonthAttendance([...dummyFilteredAttendance]);
                break;
        }

    }, [selectedAttendanceStatus])


    console.log(selectedAttendance);

    return (
        <>
            {/* <SafeAreaView style={styles.safeArea} > */}

            {monthYearSelectionModalVisible &&
                <SelectMonthYearModal
                    isVisible={monthYearSelectionModalVisible}
                    onClose={() => { setMonthYearSelectionModalVisible(false) }}
                    selectedMonth={selectedMonthYear}
                    onMonthChange={(month) => {
                        setSelectedMonthYear(month);
                        setMonthYearSelectionModalVisible(false);
                    }}
                />
            }

            {Object.keys(selectedAttendance)?.length > 0 &&
                <DailyAttendanceActionModal
                    selectedAttendance={selectedAttendance}
                    isVisible={Object.keys(selectedAttendance)?.length > 0}
                    onClose={() => setSelectedAttendance({})}
                    onApplyAttendance={() => {
                        setShowApplyAttendanceModalVisible(true);
                    }}
                    onApplyLeave={() => alert('Apply Leave')}
                />
            }

            {showApplyAttendanceModalVisible &&
                <ApplyAttendanceModal
                    isVisible={showApplyAttendanceModalVisible}
                    onClose={() => {
                        setShowApplyAttendanceModalVisible(false);
                        setSelectedAttendance({})
                    }}
                    date={selectedAttendance?.date ?? '2024-12-25'}
                />

            }

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                {/* HEADER - NOTIFICATION - GREETINGS */}
                <HeaderWithBackgroundImage
                    showGreeting={false}
                    navTitle='Attendance'
                />

                <View style={styles?.container}>

                    {/* Summary Cards */}
                    <AttendanceSummaryCard
                        cards={summaryCards}
                        selectedAttendanceStatus={selectedAttendanceStatus}
                        setSelectedAttendanceStatus={setSelectedAttendanceStatus}
                        selectedMonthYear={selectedMonthYear}
                        setSelectedMonthYear={setSelectedMonthYear}
                        monthYearSelectionModalVisible={monthYearSelectionModalVisible}
                        setMonthYearSelectionModalVisible={setMonthYearSelectionModalVisible}
                    />

                    <AttendanceTable
                        filteredSpecificMonthAttendance={filteredSpecificMonthAttendance}
                        setSelectedAttendance={setSelectedAttendance}
                    />
                </View>

            </ScrollView>
            {/* </SafeAreaView> */}
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    container: {
        width: '100%',
        padding: '4%',
        position: 'relative',
        paddingBottom: 20,
    },
});

export default AttendanceScreen


// const navigation = useNavigation();


// useLayoutEffect(() => {
//         setTabBarVisibility(navigation, true); // Ensure tab bar is visible on home
// }, [navigation]);