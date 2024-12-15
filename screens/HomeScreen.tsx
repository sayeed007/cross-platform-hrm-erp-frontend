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


const HomeScreen = () => {
    const { user, setUser } = useUser();

    const canClockAttendance = user?.additionalAccessibility?.canClockAttendance;



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
                    <View style={{ ...styles.pendingBlock, marginTop: canClockAttendance ? 160 : 80 }}>

                        <View style={styles.pendingItem}>
                            <Text style={styles.pendingNumber}>04</Text>
                            <Text style={styles.pendingLabel}>Leave Requests</Text>
                        </View>
                        <View style={styles.pendingItem}>
                            <Text style={styles.pendingNumber}>01</Text>
                            <Text style={styles.pendingLabel}>Attendance Requests</Text>
                        </View>

                    </View>

                    {/* Absent Block */}
                    <View style={styles.absentBlock}>
                        <Ionicons name="alert-circle-outline" size={20} color="#FFA500" />
                        <Text style={styles.absentText}>
                            You were absent for 2 days. Please submit your leave request.{' '}
                            <Text style={styles.link}>See absent days</Text>
                        </Text>
                    </View>

                    {/* Directory Section */}
                    <View style={styles.directorySection}>
                        <Text style={styles.sectionTitle}>Directory</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {['Philip', 'Brandon', 'Julia', 'Dianne'].map((name, index) => (
                                <View key={index} style={styles.avatarContainer}>
                                    <Ionicons name="person-circle" size={48} color="#A0AEC0" />
                                    <Text style={styles.avatarName}>{name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

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
    pendingBlock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    pendingItem: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: 140,
        elevation: 2,
    },
    pendingNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F46E5',
    },
    pendingLabel: {
        fontSize: 12,
        color: '#6B7280',
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
