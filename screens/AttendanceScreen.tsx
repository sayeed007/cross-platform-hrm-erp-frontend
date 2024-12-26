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
import { attendanceDataPreparation, cards } from '../utils/attendanceStatus';

const notLeaveAttendanceStatus = ["AFA", "AFL", "absent", "late", "present", "half day", "holiday", "weekend"];

const AttendanceScreen = () => {


    const { user } = useUser();


    const [monthYearSelectionModalVisible, setMonthYearSelectionModalVisible] = useState<boolean>(false);

    const [dailyAttendanceActionModalVisible, setDailyAttendanceActionModalVisible] = useState<boolean>(false);
    const [showApplyAttendanceModalVisible, setShowApplyAttendanceModalVisible] = useState<boolean>(false);
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

                    const { updatedAttendance, dummySummaryCards } = attendanceDataPreparation(attendanceResponse?.[0])

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


    console.log(selectedAttendance, '....Selected Attendance.........');

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

            {dailyAttendanceActionModalVisible &&
                <DailyAttendanceActionModal
                    selectedAttendance={selectedAttendance}
                    isVisible={dailyAttendanceActionModalVisible}
                    onClose={() => {
                        setSelectedAttendance({});
                        setDailyAttendanceActionModalVisible(false);
                    }}
                    onApplyAttendance={() => {
                        setDailyAttendanceActionModalVisible(false);
                        setShowApplyAttendanceModalVisible(true);
                    }}
                    onApplyLeave={() => alert('Apply Leave')}
                />
            }

            {showApplyAttendanceModalVisible &&
                <ApplyAttendanceModal
                    selectedAttendance={selectedAttendance}
                    isVisible={showApplyAttendanceModalVisible}
                    onClose={() => {
                        setShowApplyAttendanceModalVisible(false);
                        setSelectedAttendance({})
                    }}
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
                        setDailyAttendanceActionModalVisible={setDailyAttendanceActionModalVisible}
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