import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getRemainingLeaveCountForAnEmployee } from '../../../apis/Leave';
import { useUser } from '../../../context/UserContext';
import { Attendance } from '../../../typeInterfaces/Attendance';
import { LeaveDataItem } from '../../../typeInterfaces/Leave';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';
import SelectLeaveType from './SelectLeaveType';
import SelectLeaveRange from './SelectLeaveRange';
import moment from 'moment';


interface ApplyLeaveModalProps {
    selectedAttendance: Partial<Attendance>;
    isVisible: boolean;
    onClose: () => void;
    onSuccessAction: () => void;
}


const selectLeaveType = 'Select Leave Type';
const selectLeaveRange = 'Select Leave Range';
const giveLeaveReason = 'Leave Reason';
const uploadDocument = 'Upload Necessary Document';


const ApplyLeaveModal: React.FC<ApplyLeaveModalProps> = ({
    selectedAttendance,
    isVisible,
    onClose,
    onSuccessAction
}) => {
    const { user } = useUser();

    const [currentState, setCurrentState] = useState<string>(selectLeaveType);
    const [remainingLeaveCount, setRemainingLeaveCount] = useState<LeaveDataItem[]>([]);

    const [selectedLeave, setSelectedLeave] = useState('');
    const [startDate, setStartDate] = useState<string | null>(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string | null>(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        if (user?.employeeId) {
            getRemainingLeaveCountForAnEmployee(user?.employeeId).then((remainingLeaveCountResponse) => {
                if (remainingLeaveCountResponse?.[0]) {
                    setRemainingLeaveCount([...remainingLeaveCountResponse?.[0]]);
                } else {

                }
            })
        }

    }, [user?.employeeId]);

    const handleOnClose = () => {
        switch (currentState) {
            case selectLeaveType:
                onClose();
                break;
            case selectLeaveRange:
                setCurrentState(selectLeaveType);
                break;
            case giveLeaveReason:
                setCurrentState(selectLeaveRange);
                break;
            case uploadDocument:
                setCurrentState(uploadDocument);
                break;
            default:
                onClose();
                break;
        }
    };

    const showContentBasedOnCurrentState = () => {
        switch (currentState) {
            case selectLeaveType:
                return (
                    <SelectLeaveType
                        leaveData={remainingLeaveCount}
                        selectedLeave={selectedLeave}
                        onLeaveTypeChoose={(leaveType) => {
                            setSelectedLeave(leaveType);
                            setCurrentState(selectLeaveRange);
                        }}
                    />
                )
            case selectLeaveRange:
                return (
                    <SelectLeaveRange
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        onNext={() => {

                        }}
                    />
                )
            case giveLeaveReason:
                return (
                    <></>
                )
            case uploadDocument:
                return (
                    <></>
                )
            default:
                return (
                    <></>
                )
        }
    };

    // const requestForManualAttendance = (remarks: string) => {

    //     setCurrentState(SelectADate);
    //     onClose();

    //     const requestBody = {
    //         "date": selectedDate,
    //         "inTime": dailyAttendanceData?.inTime,
    //         "outTime": dailyAttendanceData?.outTime,
    //         "updatedInTime": moment(`${selectedDate} ${selectedInTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
    //         "updatedOutTime": moment(`${selectedDate} ${selectedOutTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss'),
    //         "updatedStatus": updatedStatus,
    //         "editReason": remarks
    //     };

    //     if (user?.employeeId) {
    //         requestManualAttendanceForEmployee(user?.employeeId, requestBody).then((attendanceRequestResponse) => {
    //             if (attendanceRequestResponse?.[0]) {
    //                 onSuccessAction();
    //             } else {
    //                 Toast.show({
    //                     type: 'failedToast',
    //                     position: 'bottom',
    //                     text1: `Attendance Request Failed, ${attendanceRequestResponse?.[1]}`,
    //                 });
    //             }
    //         })
    //     } else {
    //         Toast.show({
    //             type: 'failedToast',
    //             position: 'bottom',
    //             text1: `User id not found.`,
    //         });
    //     }

    // };


    console.log(remainingLeaveCount);

    return (
        <>
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

export default ApplyLeaveModal;
