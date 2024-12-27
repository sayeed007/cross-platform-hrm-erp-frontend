import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
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
import UpcomingHoliday from '../components/home/UpcomingHoliday';
import { useUser } from '../context/UserContext';
import { HomeScreenNavigationProp } from '../typeInterfaces/navigationTypes';
import { colors } from '../utils/colors';
import { setTabBarVisibility } from '../utils/navigationUtils';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {

    const { user } = useUser();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const canClockAttendance = user?.additionalAccessibility?.canClockAttendance;

    const attendanceHandleLinkPress = () => {
        navigation.navigate('Attendance');
    };

    useLayoutEffect(() => {
        setTabBarVisibility(navigation, true); // Ensure tab bar is visible on home
    }, [navigation]);


    return (
        <>

            {/* <SafeAreaView style={styles.safeArea} > */}

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                {/* HEADER - NOTIFICATION - GREETINGS */}
                <HeaderWithBackgroundImage
                    showGreeting={true}
                    navTitle='Home'
                />


                <View style={styles?.container}>

                    {/* Attendance Time Card */}
                    {canClockAttendance ?
                        <AttendanceCardWithClockIn />
                        :
                        <AttendanceCard />
                    }

                    {/* Pending Requests Block */}
                    <View style={{ marginTop: canClockAttendance ? 200 : 80 }}>
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
            {/* </SafeAreaView> */}
        </>

    );
};

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

export default HomeScreen;
