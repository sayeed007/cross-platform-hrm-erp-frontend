import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AttendanceScreen from '../screens/AttendanceScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import ProfileScreen from '../screens/ProfileScreen';

// Define the stack with RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();


const AttendanceStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
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

const styles = StyleSheet.create({
    headerGradient: {
        paddingTop: 50, // Adjust for safe area (especially on iOS)
        paddingBottom: 20,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
    },
    navTitle: {
        ...textStyle?.bold16,
        color: colors?.white,
        marginLeft: 12,
    },
});

export default AttendanceStack;
