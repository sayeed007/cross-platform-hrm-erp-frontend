import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TabBarAdvancedButton } from '../components/tab/TabBarAdvancedButton';
import AttendanceScreen from '../screens/AttendanceScreen';
import { EmptyScreen } from '../screens/EmptyScreen';
import LeaveScreen from '../screens/LeaveScreen';
import MenuScreen from '../screens/MenuScreen';
import HomeStack from '../Stack/HomeStack';

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
                color={focused ? '#4F46E5' : '#A0AEC0'}
            />
        );
    },
    tabBarLabel: ({ focused }: { focused: boolean }) => (
        <Text style={{ fontSize: 12, color: focused ? '#4F46E5' : '#A0AEC0' }}>
            {route.name}
        </Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabBarStyle,
});

export const TabBar: React.FC = () => {

    return (
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
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        height: 60,
        borderTopWidth: 0, // Remove the border
        shadowColor: 'transparent', // Remove shadow for iOS
        elevation: 0, // Remove shadow for Android
    },
    navigatorContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    navigator: {
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 30,
    },
    xFillLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 34,
    },
});
