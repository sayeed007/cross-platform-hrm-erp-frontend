import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { getDailyAttendanceForEmployee, requestManualAttendanceForEmployee } from '../../../apis/Attendance';
import { useUser } from '../../../context/UserContext';
import { Attendance, defaultAttendance } from '../../../typeInterfaces/Attendance';
import { attendanceDataPreparation } from '../../../utils/attendanceStatus';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';
import RemarksModal from './RemarksModal';
import SelectDate from './SelectDate';
import SelectInTime from './SelectInTime';
import SelectOutTime from './SelectOutTime';
import ReasonList from './SelectReason';

interface ApplyAttendanceModalProps {
    selectedAttendance: Partial<Attendance>;
    isVisible: boolean;
    onClose: () => void;
    onSuccessAction: () => void;
}


const SelectADate = 'Select Date';
const Select_In_Time = 'Select In Time';
const Select_Out_Time = 'Select Out Time';
const SelectReason = 'Please Select Reason';
const GiveRemark = 'Please Add Remark';
// const Summary = 'Summary';


const getFormattedInTime = (selectedAttendance: Attendance) => {
    const formattedInTime = moment(selectedAttendance?.finalInTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).isValid()
        ? moment(selectedAttendance?.finalInTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).format('HH:mm:ss')
        : '00:00:00';

    return (
        moment(formattedInTime, 'HH:mm:ss').format('HH:mm')
    )
};

const getFormattedOutTime = (selectedAttendance: Attendance) => {
    const formattedOutTime = moment(selectedAttendance?.finalOutTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).isValid()
        ? moment(selectedAttendance?.finalOutTime, ['YYYY-MM-DD HH:mm:ss', 'HH:mm:ss']).format('HH:mm:ss')
        : '00:00:00';

    return (
        moment(formattedOutTime, 'HH:mm:ss').format('HH:mm')
    )
};

const ApplyAttendanceModal: React.FC<ApplyAttendanceModalProps> = ({
    selectedAttendance,
    isVisible,
    onClose,
    onSuccessAction
}) => {
    const { user } = useUser();

    const [currentState, setCurrentState] = useState<string>(SelectADate);


    const [dailyAttendanceData, setDailyAttendanceData] = useState(selectedAttendance);
    const [selectedDate, setSelectedDate] = useState<string>(moment(selectedAttendance?.date ?? '2025-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD'))
    const [selectedInTime, setSelectedInTime] = useState<string>(getFormattedInTime({ ...defaultAttendance, ...selectedAttendance }));
    const [selectedOutTime, setSelectedOutTime] = useState<string>(getFormattedOutTime({ ...defaultAttendance, ...selectedAttendance }));
    const [updatedStatus, setUpdatedStatus] = useState<string>(selectedAttendance?.updatedStatus ?? '');
    const [editReason, setEditReason] = useState<string>(selectedAttendance?.editReason ?? '');


    useEffect(() => {
        if (user?.employeeId && (selectedDate !== selectedAttendance?.date)) {
            getDailyAttendanceForEmployee(user?.employeeId, selectedDate).then((attendanceResponse) => {
                if (attendanceResponse?.[0]) {
                    const { updatedAttendance } = attendanceDataPreparation(attendanceResponse?.[0]);

                    setSelectedInTime(getFormattedInTime(updatedAttendance[0]));
                    setSelectedOutTime(getFormattedOutTime(updatedAttendance[0]))
                    setUpdatedStatus(updatedAttendance[0]?.updatedStatus ?? '');
                    setEditReason(updatedAttendance[0]?.editReason ?? '');

                    setDailyAttendanceData(updatedAttendance[0]);

                    updatedStatus
                } else {

                }
            })
        }
    }, [selectedDate]);

    const handleOnClose = () => {
        switch (currentState) {
            case SelectADate:
                onClose();
                break;
            case Select_In_Time:
                setCurrentState(SelectADate);
                break;
            case Select_Out_Time:
                setCurrentState(Select_In_Time);
                break;
            case SelectReason:
                setCurrentState(Select_Out_Time);
                break;
            case GiveRemark:
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
                            setCurrentState(Select_In_Time);
                        }}
                    />
                )
            case Select_In_Time:
                return (
                    <SelectInTime
                        selectedTime={selectedInTime}
                        onTimeChange={(time) => {
                            setSelectedInTime(time);
                            setCurrentState(Select_Out_Time);
                        }}
                    />
                )
            case Select_Out_Time:
                return (
                    <SelectOutTime
                        selectedTime={selectedOutTime}
                        onTimeChange={(time) => {
                            setSelectedOutTime(time);
                            setCurrentState(SelectReason);
                        }}
                    />
                )
            case SelectReason:
                return (
                    <ReasonList
                        reason={updatedStatus}
                        onReasonSelect={(updatedStatus) => {
                            setUpdatedStatus(updatedStatus);
                            setCurrentState(GiveRemark);
                        }}
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

    const requestForManualAttendance = (remarks: string) => {

        setCurrentState(SelectADate);
        onClose();

        const requestBody = {
            "date": selectedDate,
            "inTime": dailyAttendanceData?.inTime,
            "outTime": dailyAttendanceData?.outTime,
            "updatedInTime": moment(`${selectedDate} ${selectedInTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
            "updatedOutTime": moment(`${selectedDate} ${selectedOutTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
            "updatedStatus": updatedStatus,
            "editReason": remarks
        };

        if (user?.employeeId) {
            requestManualAttendanceForEmployee(user?.employeeId, requestBody).then((attendanceRequestResponse) => {
                if (attendanceRequestResponse?.[0]) {
                    onSuccessAction();
                } else {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `Attendance Request Failed, ${attendanceRequestResponse?.[1]}`,
                    });
                }
            })
        } else {
            Toast.show({
                type: 'failedToast',
                position: 'bottom',
                text1: `User id not found.`,
            });
        }

    };

    return (
        <>

            {currentState === GiveRemark ?
                <>
                    <RemarksModal
                        isVisible={currentState === GiveRemark}
                        onClose={() => { setCurrentState(SelectReason) }}
                        onSubmit={(remarks) => {
                            requestForManualAttendance(remarks);
                        }}
                        selectedDate={selectedDate}
                        selectedInTime={selectedInTime}
                        selectedOutTime={selectedOutTime}
                        updatedStatus={updatedStatus}
                        editReason={editReason}
                    />

                </>
                :
                <Modal
                    visible={isVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={handleOnClose}
                >
                    <TouchableOpacity
                        style={styles.modalOuterContainer}
                        onPress={handleOnClose} // Close the modal when pressing outside
                    >
                        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
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
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            }
        </>

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
        maxHeight: '60%', // Limit modal height to show 6 items
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
