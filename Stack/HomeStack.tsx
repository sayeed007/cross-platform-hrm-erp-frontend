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
    <LinearGradient
        colors={['#1488CC', '#2B32B2']} // Single gradient for header and nav
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
    >
        {/* Navigation Section */}
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon name="arrow-left" size={24} color="#FFFFFF" />
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 12,
    },
});

export default HomeStack;
