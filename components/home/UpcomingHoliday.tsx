import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getYearWiseAllHolidayForEmployee } from '../../apis/HomeScreen';
import { useUser } from '../../context/UserContext';
import { defaultHolidayWithMonth, HolidayWithMonth } from '../../typeInterfaces/Holiday';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';
import HolidayCard from './HolidayCard';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const UpcomingHoliday = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

    const [loading, setLoading] = useState(true);
    const [holidayList, setHolidayList] = useState<HolidayWithMonth[]>([]);
    const [latestHoliday, setLatestHoliday] = useState<HolidayWithMonth>({ ...defaultHolidayWithMonth });


    const handleSeeAllPress = () => {
        navigation.navigate('Holiday', { holidayList: holidayList });
    };

    const getMonth = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('MMM');
    };

    useEffect(() => {
        if (user?.companyId) {
            getYearWiseAllHolidayForEmployee(user?.employeeId, startOfYear, endOfYear).then((holidayResponse) => {
                setLoading(false);
                if (holidayResponse?.[0]?.holidays?.length) {
                    const holidayList = [...holidayResponse?.[0]?.holidays];

                    const updatedHolidayList = holidayList.map((item) => ({
                        ...item,
                        startDate: moment(item.holidayStartDate).format("MMM DD, YYYY"),
                        endDate: moment(item.holidayEndDate).format("MMM DD, YYYY"),
                        month: getMonth(item.holidayStartDate),
                    }));

                    // Sort the holidays by startDate in ascending order
                    const sortedHolidayList = updatedHolidayList.sort((a, b) => {
                        return moment(a.holidayStartDate).diff(moment(b.holidayStartDate));
                    });

                    setHolidayList([...sortedHolidayList]);

                    // Logic to find the next holiday
                    const currentDate = moment(); // Current date
                    const nextHoliday = sortedHolidayList.find((holiday) =>
                        moment(holiday.holidayStartDate).isAfter(currentDate)
                    );

                    if (nextHoliday) {
                        setLatestHoliday({ ...nextHoliday });
                    }
                }
            });

        }
    }, [user?.companyId]);


    return (
        <>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Upcoming Holiday</Text>
                <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAll}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Feather name="arrow-up-right" size={14} color={colors?.info} />
                </TouchableOpacity>
            </View>

            {loading ?
                <>
                    <View style={[styles.loadingContainer, styles.marginBottom]}>
                        <ActivityIndicator size="large" color={colors?.spinner} />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </>
                :
                <>
                    {/* Notice Card */}
                    {holidayList.length > 0 ? (
                        <HolidayCard
                            holidayTitle={latestHoliday?.holidayTitle}
                            startDate={latestHoliday?.holidayStartDate}
                            endDate={latestHoliday?.holidayEndDate}
                            duration={latestHoliday?.holidayDuration}
                        />
                    ) : (
                        <Text style={styles.noNotice}>
                            No upcoming holidays for the year.
                        </Text>
                    )}
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
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
        ...textStyle?.semibold14,
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
