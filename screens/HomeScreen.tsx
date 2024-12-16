import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import AttendanceCard from '../components/home/AttendanceCard';
import AttendanceCardWithClockIn from '../components/home/AttendanceCardWithClockIn';
import HeaderWithBackgroundImage from '../components/home/HeaderWithBackgroundImage';
import { useUser } from '../context/UserContext';
import PendingLeaveAndAttendance from '../components/home/PendingLeaveAndAttendance';
import AbsentNotification from '../components/home/AbsentNotification';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeScreenNavigationProp } from '../typeInterfaces/navigationTypes';
import DirectorySection from '../components/home/DirectorySection';


const HomeScreen = () => {

    const { user } = useUser();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const canClockAttendance = user?.additionalAccessibility?.canClockAttendance;

    const attendanceHandleLinkPress = () => {
        navigation.navigate('Attendance');
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView>

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

                    {/* Latest Policy Section */}
                    <View style={styles.policySection}>
                        <Text style={styles.sectionTitle}>Latest Policies</Text>
                        <Text style={styles.policyText}>View the latest company policies here.</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
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
