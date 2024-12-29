
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getYearWiseAllHolidayForEmployee } from '../../apis/HomeScreen';
import { useUser } from '../../context/UserContext';
import { defaultHolidayWithMonth, Holiday, HolidayWithMonth } from '../../typeInterfaces/Holiday';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';
import HolidayCard from './HolidayCard';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { EmptyItemsInPage } from '../common/EmptyItemsInPage';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HOLIDAY_STORAGE_KEY = 'upcoming_holiday_data';

const UpcomingHoliday = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

    const [loading, setLoading] = useState(true);
    const [holidayList, setHolidayList] = useState<HolidayWithMonth[]>([]);
    const [latestHoliday, setLatestHoliday] = useState<HolidayWithMonth>({ ...defaultHolidayWithMonth });

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

            const currentDate = moment();
            const nextHoliday = sortedHolidayList.find((holiday: HolidayWithMonth) =>
                moment(holiday.holidayStartDate).isAfter(currentDate)
            );

            if (nextHoliday) {
                setLatestHoliday({ ...nextHoliday });
            }

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
                    setHolidayList(data?.holidays);

                    // Find the next holiday from cached data
                    const currentDate = moment();
                    const nextHoliday = data.find((holiday: HolidayWithMonth) =>
                        moment(holiday.holidayStartDate, 'MMM DD, YYYY').isAfter(currentDate)
                    );

                    if (nextHoliday) {
                        setLatestHoliday({ ...nextHoliday });
                    }
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

    const handleSeeAllPress = () => {
        navigation.navigate('Holiday', { holidayList });
    };

    return (
        <>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Upcoming Holiday</Text>
                {holidayList?.length > 0 && (
                    <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAll}>
                        <Text style={styles.seeAllText}>See All</Text>
                        <Feather name="arrow-up-right" size={14} color={colors?.info} />
                    </TouchableOpacity>
                )}
            </View>

            {loading ? (
                <View style={[styles.loadingContainer, styles.marginBottom]}>
                    <ActivityIndicator size="large" color={colors?.spinner} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : holidayList?.length > 0 ? (
                <HolidayCard
                    holidayTitle={latestHoliday?.holidayTitle}
                    startDate={latestHoliday?.holidayStartDate}
                    endDate={latestHoliday?.holidayEndDate}
                    duration={latestHoliday?.holidayDuration}
                />
            ) : (
                <EmptyItemsInPage message="No upcoming holidays for the year." />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },
    headerTitle: {
        ...textStyle?.bold18,
        color: colors?.gray4,
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        ...textStyle?.semibold12,
        color: colors?.info,
        marginRight: 4,
    },
    noNotice: {
        textAlign: 'center',
        ...textStyle?.regular14,
        color: colors?.gray2,
        marginTop: 12,
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

export default UpcomingHoliday;