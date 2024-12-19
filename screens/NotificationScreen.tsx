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


type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;


const NotificationScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const dropdownRef = useRef(null);
    const { notifications, unreadCount, visible } = useSubscription();

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
        setDropdownVisible(false);
        // console.log('Marked all as read');
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
                    <TouchableOpacity onPress={() => navigation.navigate('HomeRoot')}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notification</Text>
                    <Text></Text>
                </View>

                <View style={styles.secondaryHeader}>
                    <View>
                        <Text style={styles.unread}>
                            Unread {unreadCount && `(${unreadCount})`}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={toggleDropdown} ref={dropdownRef}>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Dropdown Menu */}
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={markAllRead}>
                            <MaterialCommunityIcons name="check" size={20} color="#000" />
                            <Text style={styles.dropdownText}>Mark all reads</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dropdownItem} onPress={clearAll}>
                            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#EF4444" />
                            <Text style={[styles.dropdownText, { color: '#EF4444' }]}>Clear all</Text>
                        </TouchableOpacity>
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
                    <View style={styles.emptyState}>
                        <Image
                            source={require('../assets/images/EmptyBox.png')}
                            style={styles.emptyImage}
                        />
                        <Text style={styles.emptyTitle}>No notification to show</Text>
                        <Text style={styles.emptySubtitle}>
                            Stay in the loop, you will be notified in any activities
                        </Text>
                    </View>
                )}
            </View>

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
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
        fontSize: 20,
        fontWeight: 600,
    },
    secondaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    unread: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    optionButton: {
        padding: 8,
    },
    optionText: {
        fontSize: 14,
        color: '#6B7280',
    },
    clearText: {
        color: '#EF4444',
    },
    notificationContainer: {
        flexDirection: 'row',
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: '#F3F4F6',
    },
    hasSeen: {
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 16,
    },
    avatarContainer: {
        marginHorizontal: 16,
    },
    messageContainer: {
        flex: 1,
    },
    sender: {
        fontWeight: 'bold',
        color: '#1F2937',
    },
    message: {
        color: '#4B5563',
        marginVertical: 4,
    },
    time: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 250,
        height: 250,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 8,
    },
    dropdown: {
        position: 'absolute',
        right: 16,
        top: 100, // Adjust based on the position of your 3-dots
        backgroundColor: '#FFFFFF',
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
        fontSize: 16,
        color: '#333333',
    },
});

export default NotificationScreen;
