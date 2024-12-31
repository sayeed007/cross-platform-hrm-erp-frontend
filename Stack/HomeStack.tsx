import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AttendanceRequestApprovalScreen from '../screens/AttendanceRequestApprovalScreen';
import HolidayScreen from '../screens/HolidayScreen';
import HomeScreen from '../screens/HomeScreen';
import { LeaveApprovalScreen } from '../screens/LeaveApprovalScreen';
import NoticeScreen from '../screens/NoticeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SeeAllCoWorkersContactScreen from '../screens/SeeAllCoWorkersContactScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';

// Define the stack with RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();


const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeRoot"
        >
            {/* Home Screen */}
            <Stack.Screen
                name="HomeRoot"
                component={HomeScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Co-Workers Contact Screen */}
            <Stack.Screen
                name="SeeAllCoWorkersContact"
                component={SeeAllCoWorkersContactScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Notice Screen */}
            <Stack.Screen
                name="Notice"
                component={NoticeScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Holiday Screen */}
            <Stack.Screen
                name="Holiday"
                component={HolidayScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />


            {/* Leave Approval Screen */}
            <Stack.Screen
                name="LeaveApproval"
                component={LeaveApprovalScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />


            {/* Attendance Request Approval Screen */}
            <Stack.Screen
                name="AttendanceRequestApproval"
                component={AttendanceRequestApprovalScreen}
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


export default HomeStack;
