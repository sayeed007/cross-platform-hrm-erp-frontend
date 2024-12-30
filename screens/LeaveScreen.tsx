import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderWithBackgroundImage from '../components/home/HeaderWithBackgroundImage';
import { useUser } from '../context/UserContext';
import { colors } from '../utils/colors';
import LeaveSummaryCard from '../components/leave/LeaveSummaryCard';
import moment from 'moment';
import SelectMonthYearModal from '../components/attendance/SelectMonthYearModal';
import YearSelectorModal from '../components/leave/YearSelectorModal';
import { textStyle } from '../utils/textStyle';
import AntDesign from '@expo/vector-icons/AntDesign';
import LeaveFilterModal from '../components/modals/LeaveFIlterModal';
import { deleteIndividualLeaveRequest, getAllLeaveRequestOfAnEmployee } from '../apis/Leave';
import { EmptyItems } from '../components/common/EmptyItems';
import { LeaveApprovalRequest } from '../typeInterfaces/LeaveApprovalRequest';
import LeaveRequestCard from '../components/leave/LeaveRequestCard';
import LeaveRequestDetailsForUser from '../components/leave/LeaveRequestDetailsForUser';
import CancelModal from '../components/modals/CancelModal';
import Toast from 'react-native-toast-message';



const leaveStatus = [
    { key: 'All', label: "All Leave" },
    { key: 'Pending', label: 'Pending Leave' },
    { key: 'Approved', label: 'Approved Leave' },
    { key: 'Rejected', label: 'Rejected Leave' },
];

const getSelectedFilterNumberValue = (filter: string, isAccepted: number) => {
    switch (filter) {
        case 'All':
            return isAccepted;
        case 'Pending':
            return 0;
        case 'Approved':
            return 1;
        case 'Rejected':
            return 2;
        default:
            return isAccepted;
    }
}


const LeaveScreen = () => {


    const { user } = useUser();

    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const [monthYearSelectionModalVisible, setMonthYearSelectionModalVisible] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<string>(moment().format('YYYY'));

    const [selectedFilter, setSelectedFilter] = useState<string>('Pending');
    const [leaveFilterModalVisible, setLeaveFilterModalVisible] = useState<boolean>(false);

    const [allLeaveRequest, setAllLeaveRequest] = useState<LeaveApprovalRequest[]>([]);
    const [filteredLeaveRequest, setFilteredLeaveRequest] = useState<LeaveApprovalRequest[]>([]);

    const [selectedLeaveData, setSelectedLeaveData] = useState<Partial<LeaveApprovalRequest>>({});
    const [leaveRequestDetailsModalVisible, setLeaveRequestDetailsModalVisible] = useState<boolean>(false);


    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState<boolean>(false);


    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        setMonthYearSelectionModalVisible(false);
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        setLeaveFilterModalVisible(false);
        setLoading(true);
    };


    useEffect(() => {
        if (user?.employeeId) {
            getAllLeaveRequestOfAnEmployee(user?.employeeId).then((leaveRequestResponse) => {
                if (leaveRequestResponse?.[0]) {
                    setAllLeaveRequest(leaveRequestResponse?.[0].sort((a: LeaveApprovalRequest, b: LeaveApprovalRequest) => {
                        return (moment(b.startDate).diff(moment(a.startDate)));
                    }));

                    // const selectedFilterAndYearWiseLeaveRequest = leaveRequestResponse?.[0]?.filter((leaveRequest: LeaveApprovalRequest) => moment(leaveRequest?.startDate, 'YYYY-MM-DD').format('YYYY') === selectedYear && leaveRequest?.isAccepted === getSelectedFilterNumberValue(selectedFilter, leaveRequest?.isAccepted)).sort((a: LeaveApprovalRequest, b: LeaveApprovalRequest) => {
                    //     return (moment(b.startDate).diff(moment(a.startDate)));
                    // });

                    // setFilteredLeaveRequest(selectedFilterAndYearWiseLeaveRequest);
                } else {
                    setAllLeaveRequest([]);
                }
            })
        }
    }, [user?.employeeId, reload]);


    useEffect(() => {
        const selectedFilterAndYearWiseLeaveRequest = allLeaveRequest?.filter((leaveRequest) => moment(leaveRequest?.startDate, 'YYYY-MM-DD').format('YYYY') === selectedYear && leaveRequest?.isAccepted === getSelectedFilterNumberValue(selectedFilter, leaveRequest?.isAccepted)
        );

        setFilteredLeaveRequest(selectedFilterAndYearWiseLeaveRequest);
    }, [allLeaveRequest, selectedYear, selectedFilter]);


    const actionOnCanallingLeaveRequest = () => {
        if (user?.employeeId && selectedLeaveData?.id)
            deleteIndividualLeaveRequest(user?.employeeId, selectedLeaveData?.id).then((deleteLeaveRequestResponse) => {
                if (deleteLeaveRequestResponse?.[0]) {
                    setIsCancelModalVisible(false);
                    setSelectedLeaveData({});

                    Toast.show({
                        type: 'successToast',
                        position: 'bottom',
                        text1: 'Leave request is successfully canceled.',
                    });
                } else {
                    setIsCancelModalVisible(false);
                    setSelectedLeaveData({});
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `Cancel Leave Request Failed, ${deleteLeaveRequestResponse?.[1]}`,
                    });
                }
            })
    };

    return (
        <>


            {/* MODAL FOR SHOWING INDIVIDUAL MONTH'S ATTENDANCE  */}
            {monthYearSelectionModalVisible &&
                <YearSelectorModal
                    isVisible={monthYearSelectionModalVisible}
                    onClose={() => setMonthYearSelectionModalVisible(false)}
                    selectedYear={selectedYear}
                    onYearChange={handleYearChange}
                />
            }

            {/* Reusable Leave Filter Modal */}
            {leaveFilterModalVisible &&
                <LeaveFilterModal
                    isVisible={leaveFilterModalVisible}
                    onClose={() => setLeaveFilterModalVisible(false)}
                    leaveStatus={leaveStatus}
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                />
            }

            {/* LEAVE REQUEST DETAILS */}
            {leaveRequestDetailsModalVisible &&
                <LeaveRequestDetailsForUser
                    isVisible={leaveRequestDetailsModalVisible}
                    leaveRequestDetails={selectedLeaveData}
                    onClose={() => {
                        setLeaveRequestDetailsModalVisible(false);
                        setSelectedLeaveData({});
                    }}
                    onEdit={() => {
                        setIsEditModalVisible(true);
                    }}
                    onCancel={() => {
                        setLeaveRequestDetailsModalVisible(false)
                        setIsCancelModalVisible(true);
                    }}
                />
            }

            {/* CANCEL LEAVE REQUEST CONFIRMATION MODAL */}
            {isCancelModalVisible &&
                <CancelModal
                    title={'Cancel Leave Request'}
                    description={'Are you Sure, you want to cancel this leave request?'}
                    isVisible={isCancelModalVisible}
                    onClose={() => {
                        setIsCancelModalVisible(false);
                        setSelectedLeaveData({});
                    }}
                    onCancel={() => { actionOnCanallingLeaveRequest() }}
                />
            }


            {/* PAGE CONTENT */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                {/* HEADER - NOTIFICATION - GREETINGS */}
                <HeaderWithBackgroundImage
                    showGreeting={false}
                    navTitle='Leave'
                />

                <View style={styles?.container}>

                    {/* Summary Cards */}
                    <LeaveSummaryCard
                        selectedYear={selectedYear}
                        monthYearSelectionModalVisible={monthYearSelectionModalVisible}
                        setMonthYearSelectionModalVisible={setMonthYearSelectionModalVisible}
                    />

                    {/* Filter Header */}
                    <View style={styles.filterHeader}>
                        <Text style={styles.filterHeaderText}>
                            All Requests
                        </Text>
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
                        {filteredLeaveRequest?.length > 0 ?
                            filteredLeaveRequest.map((request) => (
                                <LeaveRequestCard
                                    key={request.id}
                                    leaveApproval={request}

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

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    container: {
        width: '100%',
        padding: '4%',
        position: 'relative',
        paddingBottom: 20,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 90,
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
        flex: 1,
        marginBottom: 30,
    },
});

export default LeaveScreen
