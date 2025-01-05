import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { acceptSubordinateAttendanceRequest, getAllPendingAttendanceRequestForEmployee, rejectSubordinateAttendanceRequest } from '../apis/Attendance';
import AttendanceRequestApprovalCard from '../components/attendance/AttendanceRequestApprovalCard';
import AttendanceRequestDetails from '../components/attendance/AttendanceRequestDetails';
import { EmptyItems } from '../components/common/EmptyItems';
import ApproveModal from '../components/modals/ApproveModal';
import FullPageLoader from '../components/modals/FullPageLoader';
import RejectModal from '../components/modals/RejectModal';
import RequestStatusFIlterModal from '../components/modals/RequestStatusFIlterModal';
import { useUser } from '../context/UserContext';
import { AttendanceRecord } from '../typeInterfaces/AttendanceRequestApproval';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { colors } from '../utils/colors';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { textStyle } from '../utils/textStyle';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';


type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const attendanceStatus = [
    { key: 'All', label: "All Attendance Request" },
    { key: 'Pending', label: 'Pending Attendance Request' },
    { key: 'Approved', label: 'Approved Attendance Request' },
    { key: 'Rejected', label: 'Rejected Attendance Request' },
];

export const AttendanceRequestApprovalScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const [loading, setLoading] = useState(true);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
    const [selectedAttendanceData, setSelectedAttendanceData] = useState<Partial<AttendanceRecord>>({});

    const [attendanceRequests, setAttendanceRequests] = useState<AttendanceRecord[]>([]);
    const [filteredAttendanceRequests, setFilteredAttendanceRequests] = useState<AttendanceRecord[]>([]);

    const [selectedFilter, setSelectedFilter] = useState<string>('Pending');
    const [attendanceRequestFilterModalVisible, setAttendanceRequestFilterModalVisible] = useState<boolean>(false);
    const [attendanceRequestDetailsModalVisible, setAttendanceRequestDetailsModalVisible] = useState<boolean>(false);

    const [refetchData, setRefetchData] = useState<boolean>(false);


    useEffect(() => {
        if (user?.employeeId) {
            getAllPendingAttendanceRequestForEmployee(user?.employeeId).then((attendanceRequestResponse) => {
                setLoading(false);
                if (attendanceRequestResponse?.[0]) {
                    const sortedAttendanceRequest = [...attendanceRequestResponse?.[0]].sort((a: AttendanceRecord, b: AttendanceRecord) => {
                        return moment(b.date).diff(a.date);
                    });
                    setAttendanceRequests([...sortedAttendanceRequest]);
                } else {

                }
            });
        }
    }, [user?.employeeId, refetchData]);

    useEffect(() => {
        setTabBarVisibility(navigation, false);

        return () => {
            setTabBarVisibility(navigation, true);
        };
    }, [navigation]);


    useEffect(() => {
        if (attendanceRequests?.length > 0) {
            // Filter the Attendance requests based on the selected filter
            const dummyFilteredAttendanceRequests = attendanceRequests.filter((request) => {
                if (selectedFilter === 'All') return true;
                if (selectedFilter === 'Pending') return request.isAcceptedByLM === false;
                if (selectedFilter === 'Approved') return request.isAcceptedByLM === true;
                if (selectedFilter === 'Rejected') return request.isRejectedByLM === true;
                return false;
            });

            setFilteredAttendanceRequests([...dummyFilteredAttendanceRequests]);
            setLoading(false);
        }
    }, [selectedFilter, attendanceRequests]);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setAttendanceRequestFilterModalVisible(false);
        setLoading(true);
    };

    const handleReject = (reason: string) => {
        setLoading(true);
        setIsRejectModalVisible(false);
        setAttendanceRequestDetailsModalVisible(false);

        const employeeId = user?.employeeId;
        const attendanceRequestId = selectedAttendanceData?.id;
        const senderId = selectedAttendanceData?.employeeId;

        const requestBody = {
            date: selectedAttendanceData?.date ?? '',
            inTime: moment(selectedAttendanceData?.updatedInTime, 'HH:mm').format('HH:mm:ss'),
            outTime: moment(selectedAttendanceData?.updatedOutTime, 'HH:mm').format('HH:mm:ss')
        };

        if (employeeId && attendanceRequestId && senderId) {
            rejectSubordinateAttendanceRequest(attendanceRequestId, senderId, employeeId, requestBody).then((attendanceRequestRejectResponse) => {
                setLoading(false);
                setSelectedAttendanceData({});

                if (attendanceRequestRejectResponse?.[0]) {
                    setRefetchData(!refetchData);
                    Toast.show({
                        type: 'approvalReject',
                        text1: 'Request Rejected',
                        text2: 'Check Now',
                        visibilityTime: 3000,
                        position: 'bottom',
                        props: {
                            onCheckPress: () => {
                                setSelectedFilter('Rejected');
                            }
                        },
                    });
                } else {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: attendanceRequestRejectResponse?.[1],
                    });
                }
            })
        };
    };

    const handleApprove = () => {
        setLoading(true);
        setIsApproveModalVisible(false);
        setAttendanceRequestDetailsModalVisible(false);

        const employeeId = user?.employeeId;
        const attendanceRequestId = selectedAttendanceData?.id;
        const senderId = selectedAttendanceData?.employeeId;

        const requestBody = {
            date: selectedAttendanceData?.date ?? '',
            inTime: moment(selectedAttendanceData?.updatedInTime, 'HH:mm').format('HH:mm:ss'),
            outTime: moment(selectedAttendanceData?.updatedOutTime, 'HH:mm').format('HH:mm:ss')
        };

        if (employeeId && attendanceRequestId && senderId) {
            acceptSubordinateAttendanceRequest(attendanceRequestId, senderId, employeeId, requestBody).then((attendanceApprovalResponse) => {
                setLoading(false);
                if (attendanceApprovalResponse?.[0]) {
                    setRefetchData(!refetchData);
                    setSelectedAttendanceData({});

                    Toast.show({
                        type: 'approvalSuccess',
                        text1: 'Request Approved',
                        text2: 'Check Now',
                        visibilityTime: 3000,
                        position: 'bottom',
                        props: {
                            onCheckPress: () => {
                                setSelectedFilter('Approved');
                            }
                        },
                    });
                } else {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: attendanceApprovalResponse?.[1],
                    });
                }
            })
        };
    };

    const getSecondaryTitle = () => {
        switch (selectedFilter) {
            case 'All':
                return 'All Attendance Request'
            case 'Pending':
                return 'Pending Attendance Request for Approval'
            case 'Approved':
                return 'Approved Attendance Request'
            case 'Rejected':
                return 'Rejected Attendance Request'
            default:
                return 'Pending Attendance Request for Approval'
        }
    };


    return (
        <>
            {loading &&
                <FullPageLoader visible={loading} />
            }

            {/* Reusable Attendance Filter Modal */}
            {attendanceRequestFilterModalVisible &&
                <RequestStatusFIlterModal
                    isVisible={attendanceRequestFilterModalVisible}
                    onClose={() => setAttendanceRequestFilterModalVisible(false)}
                    requestStatus={attendanceStatus}
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                />
            }


            {/* Attendance REQUEST DETAILS */}
            <AttendanceRequestDetails
                isVisible={attendanceRequestDetailsModalVisible}
                attendanceRequestDetails={selectedAttendanceData}
                onClose={() => setAttendanceRequestDetailsModalVisible(false)}
                onApprove={() => {
                    setIsApproveModalVisible(true);
                }}
                onReject={() => {
                    setIsRejectModalVisible(true);
                }}
            />

            {/* Reject Modal */}
            {isRejectModalVisible &&
                <RejectModal
                    isVisible={isRejectModalVisible}
                    title={'Reject Attendance Request?'}
                    description={'Are you sure you want to reject the attendance request?'}
                    isReasonNeeded={false}
                    onClose={() => {
                        setSelectedAttendanceData({});
                        setIsRejectModalVisible(false);
                    }}
                    onReject={handleReject}
                />
            }


            {/* Approve Modal */}
            <ApproveModal
                isVisible={isApproveModalVisible}
                title={'Approve Attendance?'}
                description={'Are you sure you want to approve the attendance request?'}
                onClose={() => setIsApproveModalVisible(false)}
                onApprove={handleApprove}
            />




            <View style={styles.container}>
                {/* Header */}
                <LinearGradient
                    colors={[colors.cardGradient[0], colors.cardGradient[1]]}
                    style={styles.header}
                >
                    <View style={styles.navBar}>
                        <Icon
                            name="arrow-left"
                            size={24}
                            color={colors.white}
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={styles.navTitle}>Attendance Request Approval</Text>
                        <View />
                    </View>

                    <Text style={styles.subHeaderText}>
                        {getSecondaryTitle()}
                    </Text>
                </LinearGradient>

                {/* Filter Header */}
                <View style={styles.filterHeader}>
                    <Text style={styles.filterHeaderText}>All Requests</Text>
                    <TouchableOpacity
                        onPress={() => setAttendanceRequestFilterModalVisible(true)}
                        style={styles.filterButton}
                    >
                        <Text style={styles.filterText}>{selectedFilter}</Text>
                        <GenerateAndViewIcon
                            iconName={attendanceRequestFilterModalVisible ? "triangleUp" : "triangleDown"}
                            size={12}
                        />
                    </TouchableOpacity>
                </View>

                {/* Attendance Requests */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    style={styles.scrollView}
                >
                    {filteredAttendanceRequests?.length > 0 ?
                        filteredAttendanceRequests.map((request) => (
                            <>
                                <AttendanceRequestApprovalCard
                                    key={request.id}
                                    attendanceRequestApproval={request}
                                    onApprove={() => {
                                        setSelectedAttendanceData(request);
                                        setIsApproveModalVisible(true);
                                    }}
                                    onReject={() => {
                                        setSelectedAttendanceData(request);
                                        setIsRejectModalVisible(true);
                                    }}
                                    onViewDetails={() => {
                                        setSelectedAttendanceData(request);
                                        setAttendanceRequestDetailsModalVisible(true);
                                    }}
                                />
                            </>
                        ))
                        :
                        <EmptyItems
                            title={`No ${selectedFilter} Attendance Request to show.`}
                        />
                    }
                </ScrollView>

            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.offWhite1,
    },
    header: {
        paddingVertical: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    headerTitle: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    navTitle: {
        ...textStyle.bold16,
        color: colors.white,
    },
    subHeaderText: {
        ...textStyle.semibold16,
        color: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    filterHeaderText: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        ...textStyle.medium12,
        color: colors.info,
        marginRight: 8,
    },
    scrollView: {
        padding: 16,
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.modalBG,
    },
    modalOuterContainer: {
        flex: 1,
        backgroundColor: colors.modalBG, // Semi-transparent background
        justifyContent: 'flex-end', // Align content to the bottom
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    modalOption: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.offWhite5,
    },
    lastOption: {
        borderBottomWidth: 0, // Remove the border for the last item
    },
    modalOptionText: {
        ...textStyle.medium13,
        color: colors.gray1,
    },
    activeFilter: {
        ...textStyle.bold13,
        color: colors.black,
    }
});

export default AttendanceRequestApprovalScreen;
