import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AttendanceScreen from '../screens/AttendanceScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import MenuScreen from '../screens/MenuScreen';
import AttendanceRequestApprovalScreen from '../screens/AttendanceRequestApprovalScreen';
import LeaveApprovalScreen from '../screens/LeaveApprovalScreen';
import SeeAllCoWorkersContactScreen from '../screens/SeeAllCoWorkersContactScreen';
import HolidayScreen from '../screens/HolidayScreen';
import NoticeScreen from '../screens/NoticeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

// Define the stack with RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();


const MenuStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="MenuRoot"
        >
            {/* Home Screen */}
            <Stack.Screen
                name="MenuRoot"
                component={MenuScreen}
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

            {/* Co-Workers Contact Screen */}
            <Stack.Screen
                name="SeeAllCoWorkersContact"
                component={SeeAllCoWorkersContactScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Holiday Screen */}
            <Stack.Screen
                name="Holiday"
                component={HolidayScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Notice Screen */}
            <Stack.Screen
                name="Notice"
                component={NoticeScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />


            {/* User Profile Screen */}
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Change Password Screen */}
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />


            {/* Notification Screen */}
            <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />

            {/* Log=In Screen */}
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />


        </Stack.Navigator>
    );
};

export default MenuStack;
