import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getYearWiseAllHolidayForEmployee } from '../../apis/HomeScreen';
import { useUser } from '../../context/UserContext';
import { defaultHolidayWithMonth, HolidayWithMonth } from '../../typeInterfaces/Holiday';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';
import HolidayCard from './HolidayCard';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const UpcomingHoliday = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

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
                    <Feather name="arrow-up-right" size={14} color="#2563EB" />
                </TouchableOpacity>
            </View>

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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
        marginRight: 4,
    },
    noNotice: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999999',
        marginTop: 12,
    },
});

export default UpcomingHoliday;