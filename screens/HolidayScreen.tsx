import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HolidayCard from '../components/home/HolidayCard';
import { Holiday, HolidayWithMonth } from '../typeInterfaces/Holiday';
import { HolidayScreenProps, RootStackParamList } from '../typeInterfaces/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { throttle } from 'lodash';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';
import { useUser } from '../context/UserContext';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getYearWiseAllHolidayForEmployee } from '../apis/HomeScreen';
import FullPageLoader from '../components/modals/FullPageLoader';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;
export const HOLIDAY_STORAGE_KEY = 'upcoming_holiday_data';

const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

const HolidayScreen: React.FC<HolidayScreenProps> = ({ route }) => {

    const { user } = useUser();

    const scrollViewRef = useRef<ScrollView>(null);
    const monthScrollViewRef = useRef<ScrollView>(null);
    const sectionRefs = useRef<{ [key: string]: number }>({});
    const monthRefs = useRef<{ [key: string]: number }>({});

    const navigation = useNavigation<NavigationProp>();

    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('Jan');
    const [holidayListData, setHolidayListData] = useState<HolidayWithMonth[]>([]);

    const { holidayList }: { holidayList: HolidayWithMonth[] } = route?.params || [];

    const groupedHolidays = months?.map((month, index) => ({
        title: fullMonthNames?.[index],
        data: holidayListData?.filter((holiday) => holiday?.month === month),
    }));

    useEffect(() => {
        setTabBarVisibility(navigation, false); // Hide tab bar

        return () => {
            setTabBarVisibility(navigation, true); // Show tab bar when unmounting
        };
    }, [navigation]);

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
            const dummyHolidayList = holidayResponse?.[0]?.holidays || [];

            const updatedHolidayList: HolidayWithMonth[] = dummyHolidayList.map((item: Holiday) => ({
                ...item,
                holidayStartDate: moment(item.holidayStartDate).format('MMM DD, YYYY'),
                holidayEndDate: moment(item.holidayEndDate).format('MMM DD, YYYY'),
                month: getMonth(item.holidayStartDate),
            }));

            const sortedHolidayList = updatedHolidayList.sort((a, b) =>
                moment(a.holidayStartDate).diff(moment(b.holidayStartDate))
            );

            setHolidayListData([...sortedHolidayList]);

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
                    setHolidayListData(data?.holidays);

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
        if (holidayList?.length > 0) {
            setHolidayListData([...holidayList]);
        } else if (user?.employeeId) {
            loadHolidays();
        }
    }, [user?.employeeId, holidayList]);


    // Smooth Scroll to Section
    const handleMonthClick = (month: string) => {
        setSelectedMonth(month);

        const scrollToPosition = sectionRefs.current[month];
        if (scrollToPosition !== undefined) {
            scrollViewRef.current?.scrollTo({
                y: scrollToPosition - 20, // Add some offset
                animated: true,
            });
        }

        const monthPosition = monthRefs.current[month];
        if (monthPosition !== undefined) {
            monthScrollViewRef.current?.scrollTo({
                x: monthPosition - 100,
                animated: true,
            });
        }
    };

    // Throttled Scroll Listener
    const throttledHandleScroll = throttle((contentOffsetY: number) => {
        let currentMonth = 'Jan';
        Object.keys(sectionRefs.current).forEach((month) => {
            if (contentOffsetY >= sectionRefs.current[month] - 50) {
                currentMonth = month;
            }
        });

        if (currentMonth !== selectedMonth) {
            setSelectedMonth(currentMonth);

            const monthPosition = monthRefs.current[currentMonth];
            if (monthPosition !== undefined) {
                monthScrollViewRef.current?.scrollTo({
                    x: monthPosition - 100,
                    animated: true,
                });
            }
        }
    }, 50);

    const onScrollHandler = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        throttledHandleScroll(scrollPosition);
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <GenerateAndViewIcon
                            iconName="ArrowLeft"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>Holiday</Text>
                    <Text></Text>
                </View>

                <ScrollView
                    ref={monthScrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.monthTabs}
                >
                    {months.map((month, index) => (
                        <TouchableOpacity
                            key={month}
                            style={[
                                styles.monthTab,
                                selectedMonth === month && styles.activeMonthTab,
                            ]}
                            onLayout={(event) => {
                                monthRefs.current[month] = event.nativeEvent.layout.x;
                            }}
                            onPress={() => handleMonthClick(month)}
                        >
                            <Text
                                style={styles.monthTabText}
                            >
                                {month}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </LinearGradient>

            <ScrollView
                ref={scrollViewRef}
                style={styles.holidayContainer}
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
            >

                {loading ?
                    <FullPageLoader visible={loading} />
                    :
                    groupedHolidays.map((section) => (
                        <View
                            key={section.title}
                            onLayout={(event) => {
                                sectionRefs.current[section.title.substring(0, 3)] =
                                    event.nativeEvent.layout.y;
                            }}
                        >
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            {section.data.length > 0 ? (
                                section.data.map((holiday) => (
                                    <HolidayCard
                                        key={holiday.id}
                                        holidayTitle={holiday.holidayTitle}
                                        startDate={holiday.holidayStartDate}
                                        endDate={holiday.holidayEndDate}
                                        duration={holiday.holidayDuration}
                                    />
                                ))
                            ) : (
                                <Text style={styles.noHolidays}>No holiday available</Text>
                            )}
                        </View>
                    ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    header: {
        paddingVertical: 15,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    navTitle: {
        ...textStyle?.bold16,
        color: colors?.white,
        marginLeft: 12,
    },
    monthTabs: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    monthTab: {
        marginHorizontal: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    activeMonthTab: {
        borderWidth: 1,
        borderColor: colors?.white,
        borderRadius: 16,
    },
    monthTabText: {
        ...textStyle?.semibold14,
        color: colors?.white,
    },
    holidayContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    sectionTitle: {
        ...textStyle?.bold16,
        color: colors?.gray4,
        marginVertical: 12,
    },
    noHolidays: {
        textAlign: 'center',
        ...textStyle?.regular14,
        color: colors?.gray3,
        marginVertical: 10,
    },
});

export default HolidayScreen;
