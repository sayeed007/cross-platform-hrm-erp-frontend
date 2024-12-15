import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import LeaveScreen from '../screens/LeaveScreen';
import MenuScreen from '../screens/MenuScreen';
import { EmptyScreen } from '../screens/EmptyScreen';
import { TabBarAdvancedButton } from '../components/tab/TabBarAdvancedButton';

const Tab = createBottomTabNavigator();

// Floating Button
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
        <View style={styles.floatingButton}>
            {children}
        </View>
    </TouchableOpacity>
);

// Custom Tab Background SVG
const CustomTabBarBackground = ({ color = '#FFFFFF' }) => (
    <Svg
        width="100%"
        height="70"
        viewBox="0 0 75 75"
        style={styles.customBg}
    >
        <Path
            fill={color}
            d="M0 0h75v40c-15 20-35-5-37.5-5S15 60 0 40V0z"
        />
    </Svg>
);

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
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
                tabBarLabel: ({ focused }) => (
                    <Text style={{ fontSize: 12, color: focused ? '#4F46E5' : '#A0AEC0' }}>
                        {route.name}
                    </Text>
                ),
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Attendance" component={AttendanceScreen} />
            <Tab.Screen
                name="AddButton"
                component={() => null} // Empty screen for floating button
                options={{
                    tabBarButton: (props) => (
                        <>
                            <CustomTabBarBackground />
                            <CustomTabBarButton {...props}>
                                <Ionicons name="add" size={30} color="#FFFFFF" />
                            </CustomTabBarButton>
                        </>
                    ),
                }}
            />
            <Tab.Screen name="Leave" component={LeaveScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        height: 70,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    customButton: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#4F46E5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    customBg: {
        position: 'absolute',
        top: -30,
        left: '50%',
        transform: [{ translateX: -37.5 }],
        zIndex: -1,
    },
});
