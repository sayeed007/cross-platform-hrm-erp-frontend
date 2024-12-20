import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Modal, Platform, StyleSheet, Text, View } from 'react-native';
import { TabBarAdvancedButton } from '../components/tab/TabBarAdvancedButton';
import AttendanceScreen from '../screens/AttendanceScreen';
import { EmptyScreen } from '../screens/EmptyScreen';
import LeaveScreen from '../screens/LeaveScreen';
import MenuScreen from '../screens/MenuScreen';
import HomeStack from '../Stack/HomeStack';
import { useSubscription } from '../context/SubscriptionContext';
import * as Notifications from "expo-notifications";
import { SingleNotification } from '../components/home/SingleNotification';
import { defaultNotification } from '../typeInterfaces/Notification';
import { colors } from '../utils/colors';
const BottomBar = createBottomTabNavigator();

// Extract the screenOptions logic
const getScreenOptions = ({ route }: { route: any }) => ({
    tabBarIcon: ({ focused }: { focused: boolean }) => {
        let iconName: keyof typeof Ionicons.glyphMap | undefined;

        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Attendance') iconName = 'calendar';
        else if (route.name === 'Leave') iconName = 'log-out';
        else if (route.name === 'Menu') iconName = 'menu';

        return (
            <Ionicons
                name={iconName}
                size={24}
                color={focused ? colors?.spinner : colors?.bottomNav}
            />
        );
    },
    tabBarLabel: ({ focused }: { focused: boolean }) => (
        <Text style={{ fontSize: 12, color: focused ? colors?.spinner : colors?.bottomNav }}>
            {route.name}
        </Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabBarStyle,
});

export const TabBar: React.FC = () => {

    const { message, visible, setVisible } = useSubscription();

    useEffect(() => {
        if (visible) {
            if (Platform.OS === "web") {
                handleWebNotification();
            } else if (Platform.OS === "android" || Platform.OS === "ios") {
                handleMobileNotification();
            }
        }
    }, [visible]);

    const handleWebNotification = () => {
        // Show modal for web
        setTimeout(() => {
            setVisible(false);
        }, 5000); // Close modal after 5 seconds
    };

    const handleMobileNotification = async () => {
        // Trigger local push notification
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "New Notification",
                body: message || "You have a new notification!",
                sound: true,
            },
            trigger: null, // Trigger immediately
        });

        setTimeout(() => {
            setVisible(false);
        }, 5000); // Dismiss notification after 5 seconds
    };

    return (
        <>
            {Platform.OS === "web" && visible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <SingleNotification
                            item={{
                                ...defaultNotification,
                                message: message ?? ''
                            }}
                        />
                    </View>
                </Modal>
            )}


            <BottomBar.Navigator
                screenOptions={getScreenOptions}
            >
                <BottomBar.Screen
                    name="Home"
                    component={HomeStack}
                />
                <BottomBar.Screen
                    name="Attendance"
                    component={AttendanceScreen}
                />
                <BottomBar.Screen
                    name="Add"
                    component={EmptyScreen}
                    options={{
                        tabBarButton: (props) => (
                            <TabBarAdvancedButton
                                {...props}
                            />
                        ),
                    }}
                />
                <BottomBar.Screen
                    name="Leave"
                    component={LeaveScreen}
                />
                <BottomBar.Screen
                    name="Menu"
                    component={MenuScreen}
                />
            </BottomBar.Navigator>
        </>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: colors?.white,
        height: 60,
        borderColor: colors?.offWhite1,
        borderTopWidth: 0, // Remove the border
        shadowColor: 'transparent', // Remove shadow for iOS
        elevation: 0, // Remove shadow for Android
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors?.modalBG,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },

});
