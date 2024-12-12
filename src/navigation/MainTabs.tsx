// src/navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import LeaveScreen from '../screens/LeaveScreen';
import MenuScreen from '../screens/MenuScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap; // Restrict iconName to valid Ionicons names

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Attendance') iconName = 'calendar';
                    else if (route.name === 'Leave') iconName = 'document-text';
                    else if (route.name === 'Menu') iconName = 'menu';
                    else iconName = 'home'; // Default to home icon if no match found

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: { height: 80, paddingBottom: 10 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Attendance" component={AttendanceScreen} />
            <Tab.Screen name="Leave" component={LeaveScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
    );
}
