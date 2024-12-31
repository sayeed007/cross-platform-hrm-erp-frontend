import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import LeaveApprovalCard from '../components/leave/LeaveApprovalCard';
import { LeaveApprovalRequest } from '../typeInterfaces/LeaveApprovalRequest';
import { approveSubordinateLeaveRequest, getAllAcceptedRejectedLeaveRequestForEmployee, getAllPendingLeaveRequestForEmployee, rejectSubordinateLeaveRequest } from '../apis/Leave';
import { useUser } from '../context/UserContext';
import moment from 'moment';
import AntDesign from '@expo/vector-icons/AntDesign';
import FullPageLoader from '../components/modals/FullPageLoader';
import RejectModal from '../components/modals/RejectModal';
import ApproveModal from '../components/modals/ApproveModal';
import Toast from 'react-native-toast-message';
import LeaveRequestDetails from '../components/leave/LeaveRequestDetails';
import { EmptyItems } from '../components/common/EmptyItems';
import RequestStatusFIlterModal from '../components/modals/RequestStatusFIlterModal';


type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const leaveStatus = [
    { key: 'All', label: "All Leave" },
    { key: 'Pending', label: 'Pending Leave' },
    { key: 'Approved', label: 'Approved Leave' },
    { key: 'Rejected', label: 'Rejected Leave' },
];

export const LeaveApprovalScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const [loading, setLoading] = useState(true);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
    const [selectedLeaveData, setSelectedLeaveData] = useState<Partial<LeaveApprovalRequest>>({});

    const [leaveRequests, setLeaveRequests] = useState<LeaveApprovalRequest[]>([]);
    const [filteredLeaveRequests, setFilteredLeaveRequests] = useState<LeaveApprovalRequest[]>([]);

    const [selectedFilter, setSelectedFilter] = useState<string>('Pending');
    const [leaveFilterModalVisible, setLeaveFilterModalVisible] = useState<boolean>(false);
    const [leaveRequestDetailsModalVisible, setLeaveRequestDetailsModalVisible] = useState<boolean>(false);

    const [refetchData, setRefetchData] = useState<boolean>(false);
    const [leaveRejectReason, setLeaveRejectReason] = useState<string>('');


    useEffect(() => {
        if (user?.employeeId) {
            getAllPendingLeaveRequestForEmployee(user?.employeeId).then((leaveRequestResponse) => {
                if (leaveRequestResponse?.[0]) {

                    getAllAcceptedRejectedLeaveRequestForEmployee(user?.employeeId).then((acceptedRejectedLeaveRequestResponse) => {
                        setLoading(false);
                        if (acceptedRejectedLeaveRequestResponse?.[0]) {
                            const sortedLeaveRequest = [...leaveRequestResponse?.[0], ...acceptedRejectedLeaveRequestResponse?.[0]].sort((a: LeaveApprovalRequest, b: LeaveApprovalRequest) => {
                                return moment(b.startDate).diff(a.startDate);
                            });
                            setLeaveRequests([...sortedLeaveRequest]);
                        } else {

                        }
                    });
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
        if (leaveRequests?.length > 0) {
            // Filter the leave requests based on the selected filter
            const dummyFilteredLeaveRequests = leaveRequests.filter((request) => {
                if (selectedFilter === 'All') return true;
                if (selectedFilter === 'Pending') return request.isAccepted === 0;
                if (selectedFilter === 'Approved') return request.isAccepted === 1;
                if (selectedFilter === 'Rejected') return request.isAccepted === 2;
                return false;
            });

            setFilteredLeaveRequests([...dummyFilteredLeaveRequests]);
            setLoading(false);
        }
    }, [selectedFilter, leaveRequests]);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setLeaveFilterModalVisible(false);
        setLoading(true);
    };


    const handleReject = (reason: string) => {
        setLoading(true);
        setIsRejectModalVisible(false);
        setLeaveRequestDetailsModalVisible(false);

        const employeeId = user?.employeeId;
        const senderId = selectedLeaveData?.senderId;
        const leaveRequestId = selectedLeaveData?.id;
        const requestBody = { content: reason };

        if (employeeId && senderId && leaveRequestId) {
            rejectSubordinateLeaveRequest(employeeId, senderId, leaveRequestId, requestBody).then((leaveRejectResponse) => {
                setLoading(false);
                if (leaveRejectResponse?.[0]) {
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

                }
            })
        };
    };

    const handleApprove = () => {
        setLoading(true);
        setIsApproveModalVisible(false);
        setLeaveRequestDetailsModalVisible(false);

        const employeeId = user?.employeeId;
        const senderId = selectedLeaveData?.senderId;
        const leaveRequestId = selectedLeaveData?.id;

        if (employeeId && senderId && leaveRequestId) {
            approveSubordinateLeaveRequest(employeeId, senderId, leaveRequestId).then((leaveApprovalResponse) => {
                setLoading(false);
                if (leaveApprovalResponse?.[0]) {
                    setRefetchData(!refetchData);
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

                }
            })
        };
    };

    const getSecondaryTitle = () => {
        switch (selectedFilter) {
            case 'All':
                return 'All Leave Request'
            case 'Pending':
                return 'Pending Leave Request for Approval'
            case 'Approved':
                return 'Approved Leave Request'
            case 'Rejected':
                return 'Rejected Leave Request'
            default:
                return 'Pending Leave Request for Approval'
        }
    }


    return (
        <>
            {loading &&
                <FullPageLoader visible={loading} />
            }

            {/* Reusable Leave Filter Modal */}
            {leaveFilterModalVisible &&
                <RequestStatusFIlterModal
                    isVisible={leaveFilterModalVisible}
                    onClose={() => setLeaveFilterModalVisible(false)}
                    requestStatus={leaveStatus}
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                />
            }



            {/* LEAVE REQUEST DETAILS */}
            <LeaveRequestDetails
                isVisible={leaveRequestDetailsModalVisible}
                leaveRequestDetails={selectedLeaveData}
                onClose={() => setLeaveRequestDetailsModalVisible(false)}
                onApprove={() => {
                    setIsApproveModalVisible(true);
                }}
                onReject={() => {
                    setIsRejectModalVisible(true);
                }}
            />

            {/* Approve Modal */}
            <RejectModal
                isVisible={isRejectModalVisible}
                title={'Reject Leave?'}
                description={'Are you sure you want to reject the leave request?'}
                reason={leaveRejectReason}
                isReasonNeeded={true}
                onClose={() => {
                    setIsRejectModalVisible(false);
                    setLeaveRejectReason('');
                }}
                onReject={handleReject}
                setReason={setLeaveRejectReason}
            />

            {/* Approve Modal */}
            <ApproveModal
                isVisible={isApproveModalVisible}
                title={'Approve Leave?'}
                description={'Are you sure you want to approve the leave request?'}
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
                        <Text style={styles.navTitle}>Leave Approval</Text>
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
                        onPress={() => setLeaveFilterModalVisible(true)}
                        style={styles.filterButton}
                    >
                        <Text style={styles.filterText}>{selectedFilter}</Text>

                        <AntDesign name={leaveFilterModalVisible ? "caretup" : "caretdown"} size={12} color={colors.info} />
                    </TouchableOpacity>
                </View>

                {/* Leave Requests */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    style={styles.scrollView}
                >
                    {filteredLeaveRequests?.length > 0 ?
                        filteredLeaveRequests.map((request) => (
                            <LeaveApprovalCard
                                key={request.id}
                                leaveApproval={request}
                                onApprove={() => {
                                    setSelectedLeaveData(request);
                                    setIsApproveModalVisible(true);
                                }}
                                onReject={() => {
                                    setSelectedLeaveData(request);
                                    setIsRejectModalVisible(true);
                                }}
                                onViewDetails={() => {
                                    setSelectedLeaveData(request);
                                    setLeaveRequestDetailsModalVisible(true);
                                }}
                            />
                        ))
                        :
                        <EmptyItems
                            title={`No ${selectedFilter} leave to show.`}
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
        paddingTop: 40,
        paddingBottom: 10,
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

export default LeaveApprovalScreen;
