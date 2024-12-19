import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import LatestNoticeCard from '../components/home/LatestNoticeCard';
import { NoticeScreenProps, RootStackParamList } from '../typeInterfaces/navigationTypes';
import { NoticeWithMonth } from '../typeInterfaces/Notice';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { throttle } from 'lodash';
import { setTabBarVisibility } from '../utils/navigationUtils';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const NoticeScreen: React.FC<NoticeScreenProps> = ({ route }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const monthScrollViewRef = useRef<ScrollView>(null);
    const sectionRefs = useRef<{ [key: string]: number }>({});
    const monthRefs = useRef<{ [key: string]: number }>({});
    const navigation = useNavigation<NavigationProp>();

    const { noticeList }: { noticeList: NoticeWithMonth[] } = route.params;
    const [selectedMonth, setSelectedMonth] = useState('Jan');

    // Group notices by month
    const groupedNotices = months.map((month, index) => ({
        title: fullMonthNames[index],
        data: noticeList.filter((notice) => notice.month === month),
    }));

    useEffect(() => {
        setTabBarVisibility(navigation, false); // Hide tab bar

        return () => {
            setTabBarVisibility(navigation, true); // Show tab bar when unmounting
        };
    }, [navigation]);

    // Scroll to specific section
    const handleMonthClick = (month: string) => {
        setSelectedMonth(month);

        const scrollToPosition = sectionRefs.current[month];
        if (scrollToPosition !== undefined) {
            scrollViewRef.current?.scrollTo({
                y: scrollToPosition - 20, // Offset
                animated: true,
            });
        }

        // Center the month tab
        const monthPosition = monthRefs.current[month];
        if (monthPosition !== undefined) {
            monthScrollViewRef.current?.scrollTo({
                x: monthPosition - 100,
                animated: true,
            });
        }
    };

    // Throttled Scroll Listener
    const handleScroll = throttle((contentOffsetY: number) => {
        let currentMonth = 'Jan';
        Object.keys(sectionRefs.current).forEach((month) => {
            if (contentOffsetY >= sectionRefs.current[month] - 50) {
                currentMonth = month;
            }
        });

        if (currentMonth !== selectedMonth) {
            setSelectedMonth(currentMonth);

            // Center the active month tab
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
        handleScroll(scrollPosition);
    };

    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient colors={['#1488CC', '#2B32B2']} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeRoot')}>
                        <Icon name="arrow-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>Notice</Text>
                    <View />
                </View>

                {/* Month Tabs */}
                <ScrollView
                    ref={monthScrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.monthTabs}
                >
                    {months.map((month) => (
                        <TouchableOpacity
                            key={month}
                            style={[styles.monthTab, selectedMonth === month && styles.activeMonthTab]}
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

            {/* Notices Section */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.noticeContainer}
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
            >
                {groupedNotices.map((section) => (
                    <View
                        key={section.title}
                        onLayout={(event) => {
                            sectionRefs.current[section.title.substring(0, 3)] =
                                event.nativeEvent.layout.y;
                        }}
                    >
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.data.length > 0 ? (
                            section.data.map((notice) => (
                                <LatestNoticeCard
                                    key={notice.id}
                                    noticeTitle={notice.noticeTitle}
                                    noticeDescription={notice.noticeDescription}
                                    uploadedDate={notice.uploadedDate}
                                />
                            ))
                        ) : (
                            <Text style={styles.noNotices}>No notices available</Text>
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
        borderColor: '#FFFFFF',
        borderRadius: 16,
    },
    monthTabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    noticeContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 12,
    },
    noNotices: {
        textAlign: 'center',
        fontSize: 14,
        color: '#9CA3AF',
        marginVertical: 10,
    },
});

export default NoticeScreen;