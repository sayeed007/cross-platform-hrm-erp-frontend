import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import ProfileIndividualDetails from './ProfileIndividualDetails';
import { textStyle } from '../../utils/textStyle';
import { useUser } from '../../context/UserContext';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../utils/attendanceStatus';
import { ActualLeavePolicy } from '../../typeInterfaces/User';
import { getEmployeeHolidaysByEmployeeId, getYearWiseAllHolidayForEmployee } from '../../apis/HomeScreen';
import { Holiday, HolidayPolicy, HolidayWithMonth } from '../../typeInterfaces/Holiday';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOLIDAY_STORAGE_KEY } from '../home/UpcomingHoliday';
import HolidayCard from '../home/HolidayCard';
import { EmptyItemsInPage } from '../common/EmptyItemsInPage';



const HolidayPolicyInfo = () => {
    const { user } = useUser();

    const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

    const [loading, setLoading] = useState(true);
    const [holidayPolicyInfo, setHolidayPolicyInfo] = useState<HolidayPolicy>();
    const [holidayList, setHolidayList] = useState<HolidayWithMonth[]>([]);

    const getMonth = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('MMM');
    };

    const fetchAndStoreHolidays = async (currentAccessToken: string) => {
        try {
            const holidayResponse = await getYearWiseAllHolidayForEmployee(
                user?.employeeId ?? 0,
                startOfYear,
                endOfYear
            );
            setHolidayPolicyInfo(holidayResponse?.[0]);
            const holidayList = holidayResponse?.[0]?.holidays || [];

            const updatedHolidayList: HolidayWithMonth[] = holidayList.map((item: Holiday) => ({
                ...item,
                holidayStartDate: moment(item.holidayStartDate).format('MMM DD, YYYY'),
                holidayEndDate: moment(item.holidayEndDate).format('MMM DD, YYYY'),
                month: getMonth(item.holidayStartDate),
            }));

            const sortedHolidayList = updatedHolidayList.sort((a, b) =>
                moment(a.holidayStartDate).diff(moment(b.holidayStartDate))
            );

            setHolidayList([...sortedHolidayList]);

            // Store data in AsyncStorage
            const storageValue = JSON.stringify({
                accessToken: currentAccessToken,
                data: holidayResponse?.[0],
            });
            await AsyncStorage.setItem(HOLIDAY_STORAGE_KEY, storageValue);
        } catch (error) {
            console.error('Error fetching holidays:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadHolidays = async () => {
        const currentAccessToken = user?.accessToken ?? ''; // Replace with actual token logic
        setLoading(true);

        try {
            const storedData = await AsyncStorage.getItem(HOLIDAY_STORAGE_KEY);

            if (storedData) {
                const { accessToken, data } = JSON.parse(storedData);
                if (accessToken === currentAccessToken) {
                    setHolidayPolicyInfo(data);
                    setHolidayList(data?.holidays);

                    setLoading(false);
                    return;
                }
            }

            // Fetch and store data if no valid cache is available
            await fetchAndStoreHolidays(currentAccessToken);
        } catch (error) {
            console.error('Error loading holidays:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.employeeId) {
            loadHolidays();
        }
    }, [user?.employeeId]);

    return (
        <>
            {loading ?
                (
                    <View style={[styles.loadingContainer, styles.marginBottom]} >
                        <ActivityIndicator size="large" color={colors?.spinner} />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View >
                )
                : holidayList.length > 0 ?
                    (
                        <View style={styles.container}>
                            {/* List Title */}
                            <Text style={styles.title}>
                                Holiday Policy info
                            </Text>

                            <ProfileIndividualDetails
                                title={'Policy Name'}
                                value={holidayPolicyInfo?.holidayPolicyName ?? ''}
                                index={'Policy Name'}
                            />

                            <ProfileIndividualDetails
                                title={'No of Holiday'}
                                value={holidayPolicyInfo?.holidays?.length ?? ''}
                                index={'No of Holiday'}
                            />

                            {/* FlatList */}
                            <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={false}
                                key={'Holiday Policy info'}
                                data={holidayPolicyInfo?.holidays}
                                keyExtractor={(item, index) => `${item.id}-${index}`}
                                renderItem={({ item, index }) => (
                                    <HolidayCard
                                        key={item.id}
                                        holidayTitle={item.holidayTitle}
                                        startDate={item.holidayStartDate}
                                        endDate={item.holidayEndDate}
                                        duration={item.holidayDuration}
                                    />
                                )}
                                style={{ flex: 1 }}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        </View>
                    )
                    :
                    (
                        <EmptyItemsInPage
                            message="No holidays for the year." />
                    )
            }
        </>
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
        // backgroundColor: colors.offWhite5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        ...textStyle?.regular16,
        color: colors?.gray2,
    },
    marginBottom: {
        marginBottom: 16,
    },
});

export default HolidayPolicyInfo;
