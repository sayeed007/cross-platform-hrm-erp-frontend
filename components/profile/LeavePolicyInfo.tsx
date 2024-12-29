import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { colors } from '../../utils/colors';
import ProfileIndividualDetails from './ProfileIndividualDetails';
import { textStyle } from '../../utils/textStyle';
import { useUser } from '../../context/UserContext';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../utils/attendanceStatus';
import { ActualLeavePolicy } from '../../typeInterfaces/User';



const LeavePolicyInfo = () => {
    const { user } = useUser();
    const officialBenefit = user?.employeeInfo.officialBenefit;
    const leavePolicyInfo = user?.employeeInfo.leavePolicy;
    const actualLeavePolicy: any = {
        ...user?.employeeInfo.actualLeavePolicy,
        annual: user?.employeeInfo?.annualLeaveModel?.totalLeave ? user?.employeeInfo?.annualLeaveModel?.totalLeave : 0
    };
    const leaveConsume = user?.employeeInfo.leaveConsumed;

    const hasLFA = officialBenefit?.hasLFA;
    const lfaEligibilityDate = officialBenefit?.lfaEligibilityDate
        ? moment(officialBenefit.lfaEligibilityDate).format('YYYY-MM-DD')
        : '';
    const today = moment().format('YYYY-MM-DD');



    const filteredLeaves = leavePolicyInfo?.configurableLeaves?.filter((leaveType) => {
        const isLFAEligible = leaveType.leaveType === 'lfa' && hasLFA && lfaEligibilityDate <= today;
        const isAnnualEligible = leaveType.leaveType === 'annual' && (!hasLFA || (hasLFA && lfaEligibilityDate > today));
        const isOtherType = leaveType.leaveType !== 'lfa' && leaveType.leaveType !== 'annual';
        const isLimited = leaveType.leaveAllocationType !== 'NOT_LIMITED';

        return (isLFAEligible || isAnnualEligible || isOtherType) && isLimited;
    });

    const getLeaveCount = (type: string, source: any, fallbackKey: string) => {
        return source?.[type]
            ? source[type].toFixed(2)
            : (source[fallbackKey]?.find((leave: any) => leave.leaveType === type)?.leaveTypeCount || 0).toFixed(2);
    };


    return (
        <View style={styles.container}>
            {/* List Title */}
            <Text style={styles.title}>
                Leave Policy Info
            </Text>

            {/* FlatList */}
            <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                key={'Leave Policy Info'}
                data={filteredLeaves}
                keyExtractor={(item, index) => `${item.leaveType}-${index}`}
                renderItem={({ item, index }) => (
                    <>
                        <ProfileIndividualDetails
                            title={'Leave Type'}
                            value={capitalizeFirstLetter(item.leaveType)}
                            index={`${item.leaveType}-${index}`}
                        />


                        <View style={styles.countContainer}>
                            {/* GENERAL */}
                            <View style={[styles.itemContainer, styles.rightBorder]}>
                                <ProfileIndividualDetails
                                    title={'General'}
                                    value={item.numberOfLeave
                                        ? item.numberOfLeave.toFixed(2)
                                        : item.leaveAllocationType === 'CALCULATED'
                                            ? actualLeavePolicy?.[item.leaveType]?.toFixed(2)
                                            : 0.00}
                                    index={`${item.leaveType}-${index}`}
                                />
                            </View>

                            {/* Actual */}
                            <View style={[styles.itemContainer, styles.rightBorder]}>
                                <ProfileIndividualDetails
                                    title={'Actual Leave'}
                                    value={getLeaveCount(item.leaveType, actualLeavePolicy, 'leaveCounts')}
                                    index={`${item.leaveType}-${index}`}
                                />
                            </View>

                            {/* Used */}
                            <View style={styles.itemContainer}>
                                <ProfileIndividualDetails
                                    title={'Used Leaves'}
                                    value={getLeaveCount(item.leaveType, leaveConsume, 'leaveCounts')}
                                    index={`${item.leaveType}-${index}`}
                                />
                            </View>
                        </View>

                    </>


                )}
                style={{ flex: 1 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 6,
        marginHorizontal: 16,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        ...textStyle.semibold20,
        color: colors.black,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
    countContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: colors.offWhite1,
        marginBottom: 10,
        borderRadius: 8,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center', // Center align items horizontally
        justifyContent: 'center', // Center align items vertically
        paddingHorizontal: 10, // Add padding to keep content neat
    },
    rightBorder: {
        borderRightWidth: 1,
        borderRightColor: colors.offWhite5,
    },

});

export default LeavePolicyInfo;
