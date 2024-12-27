import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SingleNotification } from '../components/home/SingleNotification';
import { useSubscription } from '../context/SubscriptionContext';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { Notification } from '../typeInterfaces/Notification';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { useUser } from '../context/UserContext';
import { markAllNotificationAsRead } from '../apis/HomeScreen';
import { colors } from '../utils/colors';
import { EmptyItems } from '../components/common/EmptyItems';
import { textStyle } from '../utils/textStyle';


type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;


const NotificationScreen = () => {
    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();
    const dropdownRef = useRef(null);
    const { notifications, fetchNotifications, unreadCount, visible } = useSubscription();

    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        setTabBarVisibility(navigation, false); // Hide tab bar

        return () => {
            setTabBarVisibility(navigation, true); // Show tab bar when unmounting
        };
    }, [navigation]);


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const markAllRead = () => {

        if (user?.employeeId) {
            markAllNotificationAsRead(user?.employeeId ?? 0).then((markedAllReadResponse) => {
                if (markedAllReadResponse?.[0]) {
                    fetchNotifications();
                    setDropdownVisible(false);
                } else {

                }
            })

        }
    };

    const clearAll = () => {
        setDropdownVisible(false);
        // console.log('Cleared all notifications');
    };


    const renderItem = ({ item }: { item: Notification }) => (
        <SingleNotification item={item} />
    );


    return (
        <>

            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors?.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notification</Text>
                    <Text></Text>
                </View>

                <View style={styles.secondaryHeader}>
                    <View>
                        <Text style={styles.unread}>
                            Unread {unreadCount > 0 && `(${unreadCount})`}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={toggleDropdown} ref={dropdownRef}>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color={colors?.black} />
                    </TouchableOpacity>
                </View>

                {/* Dropdown Menu */}
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={markAllRead}>
                            <MaterialCommunityIcons name="check" size={20} color={colors?.black} />
                            <Text style={styles.dropdownText}>Mark all reads</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.dropdownItem} onPress={clearAll}>
                            <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors?.error} />
                            <Text style={[styles.dropdownText, { color: {colors?.error} }]}>Clear all</Text>
                        </TouchableOpacity> */}
                    </View>
                )}

                {/* Notifications */}
                {notifications.length > 0 ? (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.notificationId.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <EmptyItems
                        title={'No notification to show'}
                        subtitle={'Stay in the loop, you will be notified in any activities.'}
                    />
                )}
            </View>

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
        marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    headerTitle: {
        ...textStyle?.semibold20,
    },
    secondaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    unread: {
        ...textStyle?.bold20,
    },
    dropdown: {
        position: 'absolute',
        right: 16,
        top: 100, // Adjust based on the position of your 3-dots
        backgroundColor: colors?.white,
        borderRadius: 8,
        elevation: 5, // Adds shadow
        paddingVertical: 8,
        width: 160,
        zIndex: 10,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    dropdownText: {
        marginLeft: 8,
        ...textStyle?.regular16,
        color: colors?.black,
    },
});

export default NotificationScreen;
