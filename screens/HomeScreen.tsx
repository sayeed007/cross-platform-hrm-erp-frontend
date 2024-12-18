import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import AbsentNotification from '../components/home/AbsentNotification';
import AttendanceCard from '../components/home/AttendanceCard';
import AttendanceCardWithClockIn from '../components/home/AttendanceCardWithClockIn';
import DirectorySection from '../components/home/DirectorySection';
import HeaderWithBackgroundImage from '../components/home/HeaderWithBackgroundImage';
import LatestNotice from '../components/home/LatestNotice';
import PendingLeaveAndAttendance from '../components/home/PendingLeaveAndAttendance';
import { useUser } from '../context/UserContext';
import { HomeScreenNavigationProp } from '../typeInterfaces/navigationTypes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpcomingHoliday from '../components/home/UpcomingHoliday';


const HomeScreen = () => {

    const { user } = useUser();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const canClockAttendance = user?.additionalAccessibility?.canClockAttendance;

    const attendanceHandleLinkPress = () => {
        navigation.navigate('Attendance');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} >

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                >
                    {/* HEADER - NOTIFICATION - GREETINGS */}
                    <HeaderWithBackgroundImage />


                    <View style={styles?.container}>

                        {/* Attendance Time Card */}
                        {canClockAttendance ?
                            <AttendanceCardWithClockIn />
                            :
                            <AttendanceCard />
                        }

                        {/* Pending Requests Block */}
                        <View style={{ marginTop: canClockAttendance ? 160 : 80 }}>
                            <PendingLeaveAndAttendance />
                        </View>

                        {/* Absent Block */}
                        <AbsentNotification onLinkPress={attendanceHandleLinkPress} />

                        {/* Directory Section */}
                        <DirectorySection />

                        {/* Latest Notice Section */}
                        <LatestNotice />


                        {/* Upcoming Holiday Section */}
                        <UpcomingHoliday />

                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'F6F6F6',
    },
    container: {
        width: '100%',
        padding: '4%',
        position: 'relative',
        paddingBottom: 80,
    },
    absentBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    absentText: {
        marginLeft: 8,
        color: '#6B7280',
    },
    link: {
        color: '#4F46E5',
        textDecorationLine: 'underline',
    },
    directorySection: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    avatarContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    avatarName: {
        marginTop: 4,
        fontSize: 12,
        color: '#6B7280',
    },
    policySection: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 2,
    },
    policyText: {
        fontSize: 14,
        color: '#6B7280',
    },

});

export default HomeScreen;
