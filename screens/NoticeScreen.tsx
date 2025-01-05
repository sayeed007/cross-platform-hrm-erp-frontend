import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LatestNoticeCard from '../components/home/LatestNoticeCard';
import { NoticeScreenProps, RootStackParamList } from '../typeInterfaces/navigationTypes';
import { Notice, NoticeWithMonth } from '../typeInterfaces/Notice';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { throttle } from 'lodash';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';
import { useUser } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { getCompanyWiseAllNotice } from '../apis/HomeScreen';
import FullPageLoader from '../components/modals/FullPageLoader';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;
const NOTICE_STORAGE_KEY = 'latest_notice_data';

const NoticeScreen: React.FC<NoticeScreenProps> = ({ route }) => {

    const { user } = useUser();

    const scrollViewRef = useRef<ScrollView>(null);
    const monthScrollViewRef = useRef<ScrollView>(null);
    const sectionRefs = useRef<{ [key: string]: number }>({});
    const monthRefs = useRef<{ [key: string]: number }>({});

    const navigation = useNavigation<NavigationProp>();

    const [selectedMonth, setSelectedMonth] = useState('Jan');
    const [loading, setLoading] = useState(true);
    const [noticeListData, setNoticeListData] = useState<NoticeWithMonth[]>([]);

    const { noticeList }: { noticeList: NoticeWithMonth[] } = route?.params || [];

    // Group notices by month
    const groupedNotices = months?.map((month, index) => ({
        title: fullMonthNames[index],
        data: noticeListData?.filter((notice) => notice.month === month),
    }));

    useEffect(() => {
        setTabBarVisibility(navigation, false); // Hide tab bar

        return () => {
            setTabBarVisibility(navigation, true); // Show tab bar when unmounting
        };
    }, [navigation]);

    const getNoticeMonth = (notice: Notice) => {
        const date = notice?.lastModifiedDate
            ? moment(
                `${notice.lastModifiedDate} ${notice.lastModifiedTime}`,
                'YYYY-MM-DD HH:mm:ss'
            ).format('MMM')
            : moment(
                `${notice.uploadedDate} ${notice.uploadedTime}`,
                'YYYY-MM-DD HH:mm:ss'
            ).format('MMM');
        return date;
    };

    const fetchAndStoreNotices = async (currentAccessToken: string) => {
        try {
            const noticeResponse = await getCompanyWiseAllNotice(user?.companyId ?? 1);
            const sortedNotices = [...noticeResponse?.[0]]?.sort(
                (a: Notice, b: Notice) => {
                    const dateA = a.lastModifiedDate
                        ? moment(
                            `${a.lastModifiedDate} ${a.lastModifiedTime}`,
                            'YYYY-MM-DD HH:mm:ss'
                        )
                        : moment(
                            `${a.uploadedDate} ${a.uploadedTime}`,
                            'YYYY-MM-DD HH:mm:ss'
                        );
                    const dateB = b.lastModifiedDate
                        ? moment(
                            `${b.lastModifiedDate} ${b.lastModifiedTime}`,
                            'YYYY-MM-DD HH:mm:ss'
                        )
                        : moment(
                            `${b.uploadedDate} ${b.uploadedTime}`,
                            'YYYY-MM-DD HH:mm:ss'
                        );
                    return dateB.diff(dateA); // Descending order
                }
            );

            const noticesWithMonth = sortedNotices.map((notice) => ({
                ...notice,
                month: getNoticeMonth(notice),
            }));

            // Store data in AsyncStorage
            const storageValue = JSON.stringify({
                accessToken: currentAccessToken,
                data: noticesWithMonth,
            });
            await AsyncStorage.setItem(NOTICE_STORAGE_KEY, storageValue);

            // Update state
            setNoticeListData(noticesWithMonth);
        } catch (error) {
            console.error('Error fetching notices:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadNotices = async () => {
        const currentAccessToken = user?.accessToken ?? ''; // Replace with actual token logic
        setLoading(true);

        try {
            const storedData = await AsyncStorage.getItem(NOTICE_STORAGE_KEY);

            if (storedData) {
                const { accessToken, data } = JSON.parse(storedData);
                if (accessToken === currentAccessToken) {
                    // Use cached data
                    setNoticeListData(data);
                    setLoading(false);
                    return;
                }
            }

            // Fetch and store data if no valid cache is available
            await fetchAndStoreNotices(currentAccessToken);
        } catch (error) {
            console.error('Error loading notices:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (noticeList?.length > 0) {
            setNoticeListData([...noticeList]);
        } else if (user?.employeeId) {
            loadNotices();
        }
    }, [user?.employeeId, noticeList]);

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
            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <GenerateAndViewIcon
                            iconName="ArrowLeft"
                            size={24}
                        />
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
                {loading ?
                    <FullPageLoader visible={loading} />
                    :
                    groupedNotices.map((section) => (
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
                    ))
                }
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
    noticeContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    sectionTitle: {
        ...textStyle?.bold16,
        color: colors?.gray4,
        marginBottom: 12,
    },
    noNotices: {
        textAlign: 'center',
        ...textStyle?.regular14,
        color: colors?.gray3,
        marginVertical: 10,
    },
});

export default NoticeScreen;