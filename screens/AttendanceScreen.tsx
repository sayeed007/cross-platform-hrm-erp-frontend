import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getMonthAndYearWiseAttendanceForEmployee } from '../apis/Attendance';
import ApplyAttendanceModal from '../components/attendance/applyAttendance/ApplyAttendanceModal';
import AttendanceSummaryCard from '../components/attendance/AttendanceSummaryCard';
import AttendanceTable from '../components/attendance/AttendanceTable';
import SelectMonthYearModal from '../components/attendance/SelectMonthYearModal';
import HeaderWithBackgroundImage from '../components/home/HeaderWithBackgroundImage';
import DailyAttendanceActionModal from '../components/modals/DailyAttendanceActionModal';
import SuccessModal from '../components/modals/SuccessModal';
import { useUser } from '../context/UserContext';
import { Attendance } from '../typeInterfaces/Attendance';
import { attendanceDataPreparation, cards } from '../utils/attendanceStatus';
import { colors } from '../utils/colors';
import FullPageLoader from '../components/modals/FullPageLoader';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../typeInterfaces/navigationTypes';
import ApplyLeaveModal from '../components/leave/applyLeave/ApplyLeaveModal';

const notLeaveAttendanceStatus = ["AFA", "AFL", "absent", "late", "present", "half day", "holiday", "weekend"];

const AttendanceScreen = () => {

    const { user } = useUser();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
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
    const [refetchData, setRefetchData] = useState<boolean>(false);

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
    }, [user?.employeeId, selectedMonthYear, refetchData]);

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

    }, [selectedAttendanceStatus]);

    const handleContinue = () => {
        setTitle("");
        setDescription("");
        setSuccessModalVisible(false);

        // Refetch data after modal closes
        setTimeout(() => {
            setRefetchData((prev) => !prev);
        }, 500); // Optional delay if needed
    };

    useLayoutEffect(() => {
        setTabBarVisibility(navigation, true); // Ensure tab bar is visible on home
    }, [navigation]);

    return (
        <>
            {/* <SafeAreaView style={styles.safeArea} > */}

            {/* MODAL FOR SHOWING INDIVIDUAL MONTH'S ATTENDANCE  */}
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

            {/* MODAL FOR TAKING ACTION ON INDIVIDUAL ATTENDANCE */}
            {/* SEND LEAVE OR SEND ATTENDANCE REQUEST */}
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
                    onApplyLeave={() => {
                        setDailyAttendanceActionModalVisible(false);
                        setShowApplyLeaveModalVisible(true);
                    }}
                />
            }

            {/* MODAL FOR APPLYING MANUAL ATTENDANCE */}
            {showApplyAttendanceModalVisible &&
                <ApplyAttendanceModal
                    selectedAttendance={selectedAttendance}
                    isVisible={showApplyAttendanceModalVisible}
                    onClose={() => {
                        setShowApplyAttendanceModalVisible(false);
                        setSelectedAttendance({})
                    }}
                    onSuccessAction={() => {
                        setTitle("Attendance Request Sent Successfully");
                        setDescription("Your request is now pending for approval. Check Notification for approval status.");
                        setSuccessModalVisible(true);
                    }}
                />
            }

            {/* MODAL FOR APPLYING Leave Request */}
            {showApplyLeaveModalVisible &&
                <ApplyLeaveModal
                    selectedLeave={{}}
                    isVisible={showApplyLeaveModalVisible}
                    onClose={() => {
                        setShowApplyLeaveModalVisible(false);
                    }}
                    onSuccessAction={() => {
                        setShowApplyLeaveModalVisible(false);
                        setTitle("Leave Request Sent Successfully");
                        setDescription("Your request is now pending for approval. Check Notification for approval status.");
                        setSuccessModalVisible(true);
                    }}
                />
            }

            {/* ATTENDANCE REQUEST SUCCESS MODAL */}
            {successModalVisible &&
                <SuccessModal
                    isVisible={successModalVisible}
                    title={title}
                    description={description}
                    onContinue={handleContinue}
                />
            }

            {/* PAGE CONTENT */}
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
