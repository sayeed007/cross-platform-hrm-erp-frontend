import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SeeAllCoWorkersContactScreen from '../screens/SeeAllCoWorkersContactScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient for Expo projects
import Icon from 'react-native-vector-icons/Feather';
import NoticeScreen from '../screens/NoticeScreen';
import HolidayScreen from '../screens/HolidayScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import { LeaveApprovalScreen } from '../screens/LeaveApprovalScreen';

// Define the stack with RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

// Custom header with gradient and back button
const GradientHeader = ({
    title,
    navigation,
}: {
    title: string;
    navigation: StackNavigationProp<RootStackParamList>;
}) => (
    <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.headerGradient}>
        {/* Navigation Section */}
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-left" size={24} color={colors?.white} />
            </TouchableOpacity>
            <Text style={styles.navTitle}>{title}</Text>
        </View>
    </LinearGradient>
);

const HomeStack = () => {
    return (
        <Stack.Navigator>
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

export default HomeStack;
