import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import LatestNoticeCard from './LatestNoticeCard';
import { useUser } from '../../context/UserContext';
import { getCompanyWiseAllNotice } from '../../apis/HomeScreen';
import moment from 'moment';
import { Notice, NoticeWithMonth } from '../../typeInterfaces/Notice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


const LatestNotice = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();

    const [noticeList, setNoticeList] = useState<NoticeWithMonth[]>([]);

    const handleSeeAllPress = () => {
        navigation.navigate('Notice', { noticeList: noticeList });
    };

    const getNoticeMonth = (notice: Notice) => {
        const date = notice?.lastModifiedDate
            ? moment(`${notice.lastModifiedDate} ${notice.lastModifiedTime}`, 'YYYY-MM-DD HH:mm:ss').format('MMM')
            : moment(`${notice.uploadedDate} ${notice.uploadedTime}`, 'YYYY-MM-DD HH:mm:ss').format('MMM');

        return date;
    };

    useEffect(() => {
        if (user?.companyId) {
            getCompanyWiseAllNotice(user?.companyId).then((noticeResponse) => {
                if (noticeResponse?.[0]?.length) {
                    const sortedNotices = [...noticeResponse]?.[0].sort((a: Notice, b: Notice) => {
                        const dateA = a.lastModifiedDate
                            ? moment(`${a.lastModifiedDate} ${a.lastModifiedTime}`, 'YYYY-MM-DD HH:mm:ss')
                            : moment(`${a.uploadedDate} ${a.uploadedTime}`, 'YYYY-MM-DD HH:mm:ss');

                        const dateB = b.lastModifiedDate
                            ? moment(`${b.lastModifiedDate} ${b.lastModifiedTime}`, 'YYYY-MM-DD HH:mm:ss')
                            : moment(`${b.uploadedDate} ${b.uploadedTime}`, 'YYYY-MM-DD HH:mm:ss');

                        return dateA.diff(dateB); // Descending order
                    });


                    setNoticeList(sortedNotices?.map((notice: Notice) => ({ ...notice, month: getNoticeMonth(notice) })));
                }
            });
        }
    }, [user?.companyId]);


    return (
        <>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Latest Notice</Text>
                <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAll}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Feather name="arrow-up-right" size={14} color="#2563EB" />
                </TouchableOpacity>
            </View>

            {/* Notice Card */}
            {noticeList.length > 0 ? (
                <LatestNoticeCard
                    noticeTitle={noticeList[0]?.noticeTitle}
                    noticeDescription={noticeList[0]?.noticeDescription}
                    uploadedDate={noticeList[0]?.uploadedDate}
                />
            ) : (
                <Text style={styles.noNotice}>No notices available</Text>
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

export default LatestNotice;