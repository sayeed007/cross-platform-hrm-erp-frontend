import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AttendanceScreen from '../screens/AttendanceScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';

// Define the stack with RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();


const AttendanceStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="AttendanceRoot"
        >
            {/* Home Screen */}
            <Stack.Screen
                name="AttendanceRoot"
                component={AttendanceScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* User Profile Screen */}
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />


            {/* Notification Screen */}
            <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />



        </Stack.Navigator>
    );
};

export default AttendanceStack;
