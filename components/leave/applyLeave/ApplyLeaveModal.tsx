import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { applyForLeaveRequest, getEmployeeAllPendingRequest, getRemainingLeaveCountForAnEmployee, modifyAlreadyAppliedLeaveRequest } from '../../../apis/Leave';
import { useUser } from '../../../context/UserContext';
import { Attendance } from '../../../typeInterfaces/Attendance';
import { LeaveDataItem } from '../../../typeInterfaces/Leave';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';
import SelectLeaveType from './SelectLeaveType';
import SelectLeaveRange from './SelectLeaveRange';
import moment from 'moment';
import GiveReasonAndDocument from './GiveLeaveReasonAndDocument';
import { calculateCalenderDays } from '../../../utils/leaveUtils';
import Toast from 'react-native-toast-message';
import { LeaveApprovalRequest } from '../../../typeInterfaces/LeaveApprovalRequest';


interface ApplyLeaveModalProps {
    selectedLeave: Partial<LeaveApprovalRequest>;
    isVisible: boolean;
    onClose: () => void;
    onSuccessAction: () => void;
};

export type LeavePeriod = "oneDay" | "HALF_DAY" | "moreThanOneDay";


const selectLeaveType = 'Select Leave Type';
const selectLeaveRange = 'Select Leave Range';
const giveLeaveReasonAndDocument = 'Leave Reason & Document';


const ApplyLeaveModal: React.FC<ApplyLeaveModalProps> = ({
    selectedLeave,
    isVisible,
    onClose,
    onSuccessAction
}) => {
    const { user } = useUser();
    const leavePolicy = {
        ...user?.employeeInfo?.actualLeavePolicy,
        annual: user?.employeeInfo?.annualLeaveModel.totalLeave
    };
    const hasLFA = user?.employeeInfo?.officialBenefit?.hasLFA;
    const lfaEligibilityDate = user?.employeeInfo?.officialBenefit?.lfaEligibilityDate != null ? moment(user?.employeeInfo?.officialBenefit?.lfaEligibilityDate).format('YYYY-MM-DD') : '';
    const joiningDate = user?.employeeInfo?.joiningDate;
    const annualLeaveModel = user?.employeeInfo?.annualLeaveModel;
    const consumed = user?.employeeInfo?.leaveConsumed;
    const configurableLeaves = user?.employeeInfo?.leavePolicy?.configurableLeaves;
    const empStatus = user?.employmentStatus;


    const [currentState, setCurrentState] = useState<string>(selectLeaveType);
    const [remainingLeaveCount, setRemainingLeaveCount] = useState<LeaveDataItem[]>([]);

    const [selectedLeaveType, setSelectedLeaveType] = useState('');
    const [startDate, setStartDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [leaveDays, setLeaveDays] = useState<number>(0);
    const [leavePeriod, setLeavePeriod] = useState<LeavePeriod>('oneDay');
    const [isLfaEncashment, setLfaEncashment] = useState<boolean>(false);
    const [leaveReason, setLeaveReason] = useState<string>('');
    const [leaveFile, setLeaveFile] = useState<File | string | null>(null);




    useEffect(() => {
        if (selectedLeave?.leaveType) {
            setSelectedLeaveType(selectedLeave?.leaveType);
            setStartDate(selectedLeave?.startDate ?? moment().format('YYYY-MM-DD'));
            setEndDate(selectedLeave?.endDate ?? moment().format('YYYY-MM-DD'));
            setLeaveDays(selectedLeave?.duration ?? 0);
            setLeavePeriod(selectedLeave?.leavePeriod === "HALF_DAY" ? "HALF_DAY" :
                selectedLeave?.startDate === selectedLeave?.endDate ? 'oneDay' : 'moreThanOneDay'
            );
            setLfaEncashment(selectedLeave?.isLfaPaid ?? false);
            setLeaveReason(selectedLeave?.message ?? '');
            setLeaveFile(selectedLeave?.attachmentPath ?? null);
        }

    }, [selectedLeave])

    useEffect(() => {
        if (!user?.employeeId) return;

        const fetchLeaveData = async () => {
            try {
                const pendingLeaveResponse = await getEmployeeAllPendingRequest(user.employeeId);
                if (!pendingLeaveResponse?.[0]) {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `${pendingLeaveResponse?.[1]}`,
                    });
                    return;
                }

                const pendingLeave = {
                    ...pendingLeaveResponse[0],
                    [selectedLeave?.leaveType]: pendingLeaveResponse[0][selectedLeave?.leaveType] - selectedLeave?.duration,
                };

                const remainingLeaveCountResponse = await getRemainingLeaveCountForAnEmployee(user.employeeId);
                if (!remainingLeaveCountResponse?.[0]) {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `${remainingLeaveCountResponse?.[1]}`,
                    });
                    return;
                }

                const leaveCountResponse = [
                    ...remainingLeaveCountResponse[0],
                    { leaveType: "special", actualLeaveCount: 0, remainingLeaveCount: 0, leaveColor: "#E0E0E0" },
                    { leaveType: "unpaid", actualLeaveCount: 0, remainingLeaveCount: 0, leaveColor: "#E0E0E0" },
                ];

                const calculateAnnualLeave = () => {
                    if (
                        empStatus === "permanent" &&
                        (!hasLFA || (hasLFA && lfaEligibilityDate > moment().format("YYYY-MM-DD"))) &&
                        (leavePolicy?.["annual"] ?? 0) > (consumed?.["annual"] ?? 0) &&
                        (leavePolicy?.["annual"] ?? 0) > (consumed?.["annual"] ?? 0) + pendingLeave["annual"]
                    ) {
                        return {
                            leaveType: "annual",
                            actualLeaveCount: (leavePolicy?.["annual"] ?? 0) ?? 0,
                            remainingLeaveCount: (leavePolicy?.["annual"] ?? 0) - ((consumed?.["annual"] ?? 0) + pendingLeave["annual"]),
                            leaveColor: '#2F80ED',
                        };
                    }
                    return null;
                };

                const calculateLfaLeave = () => {
                    if (
                        empStatus === "permanent" &&
                        hasLFA &&
                        lfaEligibilityDate <= moment().format("YYYY-MM-DD") &&
                        (leavePolicy?.["lfa"] ?? 0) > (consumed?.["lfa"] ?? 0) &&
                        (leavePolicy?.["lfa"] ?? 0) > (consumed?.["lfa"] ?? 0) + pendingLeave["lfa"]
                    ) {
                        return {
                            leaveType: "lfa",
                            actualLeaveCount: (leavePolicy?.["lfa"] ?? 0) ?? 0,
                            remainingLeaveCount: (leavePolicy?.["lfa"] ?? 0) - ((consumed?.["lfa"] ?? 0) + pendingLeave["lfa"]),
                            leaveColor: '#2F80ED',
                        };
                    }
                    return null;
                };


                const calculateFinalLeaveCount = () => {
                    const annualLeave = calculateAnnualLeave();
                    const lfaLeave = calculateLfaLeave();

                    const otherLeaves = configurableLeaves?.map((eachLeaveType) => {
                        const leaveTypeData = leaveCountResponse.find((leave) => leave.leaveType === eachLeaveType.leaveType);
                        if (!leaveTypeData) return null;

                        if (eachLeaveType.leaveAllocationType === "NOT_LIMITED") {
                            return leaveTypeData;
                        }

                        const leavePolicyCount =
                            leavePolicy?.[eachLeaveType.leaveType] ??
                            leavePolicy?.leaveCounts?.find((leave) => leave.leaveType === eachLeaveType.leaveType)?.leaveTypeCount ??
                            0;

                        const consumedCount = consumed?.[eachLeaveType.leaveType] ?? 0;
                        const pendingCount = pendingLeave?.[eachLeaveType.leaveType] ?? 0;

                        if (leavePolicyCount > consumedCount + pendingCount) {
                            return leaveTypeData;
                        }

                        return null;
                    }).filter(Boolean);

                    return [...otherLeaves, annualLeave, lfaLeave].filter(Boolean);
                };

                const finalRemainingLeaveCount = calculateFinalLeaveCount();
                setRemainingLeaveCount(finalRemainingLeaveCount);
            } catch (error) {
                console.error('Error fetching leave data:', error);
            }
        };

        fetchLeaveData();
    }, [user?.employeeId]);


    const handleOnClose = () => {
        switch (currentState) {
            case selectLeaveType:
                resetState();
                onClose();
                break;
            case selectLeaveRange:
                setCurrentState(selectLeaveType);
                break;
            case giveLeaveReasonAndDocument:
                setCurrentState(selectLeaveRange);
                break;
            default:
                resetState();
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
                        selectedLeaveType={selectedLeaveType}
                        onLeaveTypeChoose={(leaveType) => {
                            setSelectedLeaveType(leaveType);
                            setCurrentState(selectLeaveRange);
                        }}
                    />
                )
            case selectLeaveRange:
                return (
                    <SelectLeaveRange
                        selectedLeaveType={selectedLeaveType}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        leaveDays={leaveDays}
                        setLeaveDays={setLeaveDays}
                        leavePeriod={leavePeriod}
                        setLeavePeriod={setLeavePeriod}
                        isLfaEncashment={isLfaEncashment}
                        setLfaEncashment={setLfaEncashment}
                        onNext={() => {
                            setCurrentState(giveLeaveReasonAndDocument);
                        }}
                    />
                )
            case giveLeaveReasonAndDocument:
                return (
                    <GiveReasonAndDocument
                        selectedLeaveType={selectedLeaveType}
                        startDate={startDate}
                        endDate={endDate}
                        leaveDays={leaveDays}
                        leavePeriod={leavePeriod}
                        isLfaEncashment={isLfaEncashment}
                        leaveReason={leaveReason}
                        setLeaveReason={setLeaveReason}
                        leaveFile={leaveFile}
                        setLeaveFile={setLeaveFile}
                        onNext={() => {
                            requestForLeave()
                        }}
                    />
                )
            default:
                return (
                    <></>
                )
        }
    };

    const requestForLeave = () => {
        const leaveReq = {
            senderId: user?.employeeId,
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
            duration: leaveDays,
            calendarDays: calculateCalenderDays(startDate, endDate),
            leavePeriod: leavePeriod,

            isLfaPaid: isLfaEncashment,
            lfaEncashmentStatus: isLfaEncashment ? "REQUESTED" : "UNPAID",

            leaveType: selectedLeaveType,
            message: leaveReason,
        };

        const formData = new FormData();
        formData.append("leaveReq", JSON.stringify(leaveReq));
        formData.append("file", leaveFile ?? '');

        // EDITING EXISTING LEAVE
        if (selectedLeave?.id && user?.employeeId) {
            modifyAlreadyAppliedLeaveRequest(user?.employeeId, selectedLeave?.id, formData).then((leaveRequestResponse) => {
                if (leaveRequestResponse?.[0]) {
                    resetState();
                    onSuccessAction();
                } else {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `Leave Request Failed, ${leaveRequestResponse?.[1]}`,
                    });
                    resetState();
                    onClose();
                }
            });
        } else {
            applyForLeaveRequest(formData).then((leaveRequestResponse) => {
                if (leaveRequestResponse?.[0]) {
                    resetState();
                    onSuccessAction();
                } else {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `Leave Request Failed, ${leaveRequestResponse?.[1]}`,
                    });
                    resetState();
                    onClose();
                }
            });
        }
    };

    const resetState = () => {
        setSelectedLeaveType('');
        setStartDate(moment().format('YYYY-MM-DD'));
        setEndDate(moment().format('YYYY-MM-DD'));
        setLeaveDays(0);
        setLeavePeriod('oneDay');
        setLfaEncashment(false);
        setLeaveReason('');
        setLeaveFile(null);
    };

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
        flex: 1,
        maxHeight: '90%', // Limit modal height to show 6 items
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
