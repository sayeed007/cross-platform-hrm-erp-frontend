

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useUser } from '../../context/UserContext';
import { getCompanyWiseAllNotice } from '../../apis/HomeScreen';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { EmptyItemsInPage } from '../common/EmptyItemsInPage';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';
import LatestNoticeCard from './LatestNoticeCard';
import { Notice, NoticeWithMonth } from '../../typeInterfaces/Notice';
import { StackNavigationProp } from '@react-navigation/stack';
import { GenerateAndViewIcon } from '../common/GenerateAndSHowIcon';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const NOTICE_STORAGE_KEY = 'latest_notice_data';

const LatestNotice = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const [loading, setLoading] = useState(true);
    const [noticeList, setNoticeList] = useState<NoticeWithMonth[]>([]);

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
            setNoticeList(noticesWithMonth);
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
                    setNoticeList(data);
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
        if (user?.companyId) {
            loadNotices();
        }
    }, [user?.companyId]);

    const handleSeeAllPress = () => {
        navigation.navigate('Notice', { noticeList });
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Latest Notice</Text>

                {noticeList?.length > 0 &&
                    <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAll}>
                        <Text style={styles.seeAllText}>See All</Text>
                        <GenerateAndViewIcon
                            iconName="ArrowUpRight"
                            size={14}
                        />
                    </TouchableOpacity>
                }
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors?.spinner} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : noticeList?.length > 0 ? (
                <LatestNoticeCard
                    noticeTitle={noticeList[0]?.noticeTitle}
                    noticeDescription={noticeList[0]?.noticeDescription}
                    uploadedDate={noticeList[0]?.uploadedDate}
                />
            ) : (
                <EmptyItemsInPage message="No notices available." />
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
        ...textStyle.bold18,
        color: colors.black,
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        ...textStyle.semibold12,
        color: colors.info,
        marginRight: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...textStyle.regular16,
        color: colors.black,
        marginTop: 10,
    },
});

export default LatestNotice;
