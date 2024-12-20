import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../context/UserContext'
import { colors } from '../../utils/colors';

const PendingLeaveAndAttendance = () => {
    const { user, setUser } = useUser();


    return (
        <>
            <View>
                <Text style={styles.titleText}> Pending Approval</Text>
            </View>

            <View style={styles.pendingBlock} >
                <View style={styles.pendingItem}>
                    <Text style={[styles.pendingNumber, styles?.leaveBackground]}>04</Text>
                    <Text style={styles.pendingLabel}>Leave Requests</Text>
                </View>
                <View style={styles.pendingItem}>
                    <Text style={[styles.pendingNumber, styles?.attendanceBackground]}>01</Text>
                    <Text style={styles.pendingLabel}>Attendance Requests</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
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
        fontSize: 24,
        fontWeight: 'bold',
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
        fontSize: 14,
        fontWeight: '600', // React Native uses numeric font weights, no 'semibold'
        marginLeft: 8,
        flexWrap: 'wrap', // Enable wrapping
        width: '70%', // Ensure the container has a constrained width
    },
})

export default PendingLeaveAndAttendance
