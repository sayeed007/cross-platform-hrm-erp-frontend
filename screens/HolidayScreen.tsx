import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HolidayCard from '../components/home/HolidayCard';
import { HolidayWithMonth } from '../typeInterfaces/Holiday';
import { HolidayScreenProps, RootStackParamList } from '../typeInterfaces/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { throttle } from 'lodash';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const HolidayScreen: React.FC<HolidayScreenProps> = ({ route }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const monthScrollViewRef = useRef<ScrollView>(null);
    const sectionRefs = useRef<{ [key: string]: number }>({});
    const monthRefs = useRef<{ [key: string]: number }>({});

    const navigation = useNavigation<NavigationProp>();

    const [selectedMonth, setSelectedMonth] = useState('Jan');

    const { holidayList }: { holidayList: HolidayWithMonth[] } = route.params;

    const groupedHolidays = months.map((month, index) => ({
        title: fullMonthNames[index],
        data: holidayList.filter((holiday) => holiday.month === month),
    }));

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
            <LinearGradient colors={['#1488CC', '#2B32B2']} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeRoot')}>
                        <Icon name="arrow-left" size={24} color="#FFFFFF" />
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
                                style={[
                                    styles.monthTabText,
                                    selectedMonth === month && styles.activeMonthTabText,
                                ]}
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
                {groupedHolidays.map((section) => (
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
        backgroundColor: '#F9FAFB',
    },
    header: {
        paddingTop: 40,
        paddingBottom: 10,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    navTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
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
        backgroundColor: '#2563EB',
    },
    monthTabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    activeMonthTabText: {
        color: '#FFFFFF',
    },
    holidayContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
        marginVertical: 12,
    },
    noHolidays: {
        textAlign: 'center',
        fontSize: 14,
        color: '#9CA3AF',
        marginVertical: 10,
    },
});

export default HolidayScreen;
