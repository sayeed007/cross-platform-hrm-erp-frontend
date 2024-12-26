import moment from 'moment';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Attendance } from '../../typeInterfaces/Attendance';
import { attendanceStatus, AttendanceStatusKey, AttendanceStatusStyle } from '../../utils/attendanceStatus';
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';
import { textStyle } from '../../utils/textStyle';

interface DailyAttendanceActionModalProps {
    selectedAttendance: Partial<Attendance>;
    isVisible: boolean;
    onClose: () => void;
    onApplyAttendance: () => void;
    onApplyLeave: () => void;
}

const DailyAttendanceActionModal: React.FC<DailyAttendanceActionModalProps> = ({
    selectedAttendance,
    isVisible,
    onClose,
    onApplyAttendance,
    onApplyLeave,
}) => {

    const {
        date,
        status,
    } = selectedAttendance;

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.modalOuterContainer}
                onPress={onClose} // Close the modal when pressing outside
            >
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.dateText}>
                                {moment(date).format('MMMM DD, YYYY')}
                            </Text>

                            <Text style={styles.dayText}>
                                {moment(date).format('dddd')}
                            </Text>
                        </View>

                        <Text style={[styles.statusText, getStatusStyle(status ?? '')]}>
                            {status}
                        </Text>
                    </View>


                    {/* Actions */}
                    <TouchableOpacity style={styles.actionButton} onPress={onApplyAttendance}>
                        <Icon name="calendar" size={20} color={colors.green} />
                        <Text style={styles.actionText}>Apply Attendance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={onApplyLeave}>
                        <Icon name="file-text" size={20} color={colors.orange} />
                        <Text style={styles.actionText}>Apply Leave</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const getStatusStyle = (status: string): AttendanceStatusStyle => {
    return attendanceStatus[status as AttendanceStatusKey] || attendanceStatus.default;
};

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        backgroundColor: colors.modalBG,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        ...shadowStyles.popUpShadow2,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    dateText: {
        ...textStyle.bold16,
        color: colors.black,
        marginRight: 15,
    },
    statusText: {
        ...textStyle.medium14,
        marginTop: 4,
    },
    dayText: {
        ...textStyle.regular14,
        color: colors.gray2,
        marginTop: 4,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
        borderTopColor: colors.offWhite5,
        borderTopWidth: 1,
    },
    actionText: {
        ...textStyle.medium14,
        color: colors.black,
        marginLeft: 15,
    },
});

export default DailyAttendanceActionModal;
