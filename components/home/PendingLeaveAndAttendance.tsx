import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useUser } from '../../context/UserContext'
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


const PendingLeaveAndAttendance = () => {
    const { user, setUser } = useUser();
    const navigation = useNavigation<NavigationProp>();


    const handleLeavePress = () => {
        navigation.navigate('LeaveApproval');
    };

    const handleAttendancePress = () => {
        navigation.navigate('AttendanceApproval');
    };

    return (
        <>
            <View>
                <Text style={styles.titleText}> Pending Approval</Text>
            </View>

            <View style={styles.pendingBlock} >
                {/* LEAVE */}
                <TouchableOpacity onPress={handleLeavePress} style={styles.pendingItem}>
                    <Text style={[styles.pendingNumber, styles?.leaveBackground]}>04</Text>
                    <Text style={styles.pendingLabel}>Leave Requests</Text>
                </TouchableOpacity>

                {/* ATTENDANCE */}
                <TouchableOpacity onPress={handleAttendancePress} style={styles.pendingItem}>
                    <Text style={[styles.pendingNumber, styles?.attendanceBackground]}>01</Text>
                    <Text style={styles.pendingLabel}>Attendance Requests</Text>
                </TouchableOpacity>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        ...textStyle?.bold16,
        marginBottom: 8,
    },
    pendingBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    pendingItem: {
        backgroundColor: colors?.white,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '48%',
        elevation: 2,
        flexDirection: 'row',
    },
    pendingNumber: {
        height: 48,
        width: '30%',
        borderRadius: 6,
        ...textStyle?.bold24,
        color: colors?.white,
        padding: 'auto',
        textAlign: 'center',
        lineHeight: 48,
    },
    leaveBackground: {
        backgroundColor: colors?.success,
    },
    attendanceBackground: {
        backgroundColor: colors?.warning,
    },
    pendingLabel: {
        ...textStyle?.semibold14,
        marginLeft: 8,
        flexWrap: 'wrap', // Enable wrapping
        width: '70%', // Ensure the container has a constrained width
    },
})

export default PendingLeaveAndAttendance
