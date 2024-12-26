import moment from 'moment';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Attendance } from '../../../typeInterfaces/Attendance';
import { attendanceStatus, AttendanceStatusKey, AttendanceStatusStyle } from '../../../utils/attendanceStatus';
import { colors } from '../../../utils/colors';
import shadowStyles from '../../../utils/shadowStyles';
import { textStyle } from '../../../utils/textStyle';
import SelectDate from './SelectDate';
import SelectTime from './SelectTime';

interface ApplyAttendanceModalProps {
    isVisible: boolean;
    onClose: () => void;
    date: string;
}


const SelectADate = 'Select Date';
const SelectInTime = 'Select In Time';
const SelectOutTime = 'Select Out Time';
const SelectReason = 'Please Select Reason';
const Summary = 'Summary';

const ApplyAttendanceModal: React.FC<ApplyAttendanceModalProps> = ({
    isVisible,
    onClose,
    date
}) => {

    const [currentState, setCurrentState] = useState<string>(SelectADate);

    const [selectedDate, setSelectedDate] = useState<string>(date)
    const [selectedTime, setSelectedTime] = useState(moment().format('HH:mm'));


    console.log(selectedDate, selectedTime);

    const handleOnClose = () => {
        switch (currentState) {
            case SelectADate:
                onClose();
                break;


            default:
                onClose();
                break;
        }

    };

    const showContentBasedOnCurrentState = () => {
        switch (currentState) {
            case SelectADate:
                return (
                    <SelectDate
                        selectedDate={selectedDate}
                        onDateChange={(date) => {
                            setSelectedDate(date);
                            setCurrentState(SelectInTime);
                        }}
                    />
                )
            case SelectInTime:
                return (
                    <SelectTime
                        selectedTime={selectedTime}
                        onTimeChange={(time) => { setSelectedTime(time) }}
                    />
                )
            default:
                return (
                    <SelectDate
                        selectedDate={selectedDate}
                        onDateChange={(date) => { setSelectedDate(date) }}
                    />
                )
        }
    };

    console.log(selectedDate);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleOnClose}
        >
            <Pressable
                style={styles.modalOuterContainer}
                onPress={handleOnClose} // Close the modal when pressing outside
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={handleOnClose}>
                                <Icon name="arrow-left" size={24} color={colors.gray1} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>{currentState}</Text>
                            <View />
                        </View>

                        {/* Content */}
                        {showContentBasedOnCurrentState()}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        backgroundColor: colors.modalBG,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: '50%', // Limit modal height to show 6 items
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerTitle: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
});

export default ApplyAttendanceModal;
