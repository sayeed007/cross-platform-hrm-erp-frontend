import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Attendance } from '../../typeInterfaces/Attendance';
import { attendanceStatus, AttendanceStatusKey, AttendanceStatusStyle, capitalizeFirstLetter, getStatusStyle } from '../../utils/attendanceStatus';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';


interface AttendanceTableProps {
    filteredSpecificMonthAttendance: Attendance[];
    // setSelectedAttendance: (status: string) => void;
    setSelectedAttendance: React.Dispatch<React.SetStateAction<Partial<Attendance>>>;
    setDailyAttendanceActionModalVisible: (action: boolean) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
    filteredSpecificMonthAttendance,
    setSelectedAttendance,
    setDailyAttendanceActionModalVisible
}) => {


    const renderRow = ({ item }: { item: Attendance }) => {
        const formattedInTime = moment(item.finalInTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).isValid()
            ? moment(item.finalInTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).format('HH:mm:ss')
            : '00:00:00';

        const formattedOutTime = moment(item.finalOutTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).isValid()
            ? moment(item.finalOutTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).format('HH:mm:ss')
            : '00:00:00';


        return (
            <TouchableOpacity style={{ ...styles.row }}
                onPress={() => {
                    setSelectedAttendance(item);
                    setDailyAttendanceActionModalVisible(true);
                }}
            >
                <Text style={styles.cell}>{moment(item.date, 'YYYY-MM-DD').format('MMM DD')}</Text>
                <Text style={styles.cell}>{formattedInTime}</Text>
                <Text style={styles.cell}>{formattedOutTime}</Text>
                <Text style={[styles.cell, getStatusStyle(item.status)]}>
                    {capitalizeFirstLetter(item.status)}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>Date</Text>
                <Text style={[styles.cell, styles.headerText]}>In Time</Text>
                <Text style={[styles.cell, styles.headerText]}>Out Time</Text>
                <Text style={[styles.cell, styles.headerText]}>Status</Text>
            </View>


            {/* Data Rows */}
            <FlatList
                data={filteredSpecificMonthAttendance}
                renderItem={renderRow}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.table}
                ListEmptyComponent={
                    <View>
                        <Text style={styles.noAttendance}>
                            No attendance records found.
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offWhite1,
        marginTop: 25,
        marginBottom: 60,
        width: '100%',
    },
    header: {
        backgroundColor: colors.offWhite4,
        paddingVertical: 10,
        width: '100%',
    },
    row: {
        width: '100%',
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.offWhite4,
    },
    cell: {
        // flex: 1,
        width: '20%',
        textAlign: 'center',
        paddingHorizontal: 5,
        color: colors.gray2,
        ...textStyle.regular13,
    },
    headerText: {
        fontWeight: 'bold',
        color: colors.gray2,
    },
    table: {
        flexGrow: 1,
    },
    noAttendance: {
        textAlign: 'center',
        padding: 20,
        ...textStyle.semibold14
    }
});

export default AttendanceTable;
