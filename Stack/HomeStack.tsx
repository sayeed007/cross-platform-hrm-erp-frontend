import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SeeAllCoWorkersContactScreen from '../screens/SeeAllCoWorkersContactScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient for Expo projects
import Icon from 'react-native-vector-icons/Feather';


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
    <>
        <LinearGradient
            colors={['#1488CC', '#2B32B2']} // Single gradient for header and nav
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
        >
            {/* Navigation Section */}
            <View style={styles.navBar}>
                <TouchableOpacity>
                    <Icon name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Directory</Text>
            </View>

            {/* Page Header Section */}
            <View style={styles.pageHeader}>
                <Text style={styles.pageHeaderText}>Co-Workers Contact Details</Text>
            </View>
        </LinearGradient>
    </>

);

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ headerShown: false }} // Hide header for Home screen
            />
            <Stack.Screen
                name="SeeAllCoWorkersContact"
                component={SeeAllCoWorkersContactScreen}
                options={({ navigation }) => ({
                    header: () => (
                        <GradientHeader
                            title="Directory"
                            navigation={navigation}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    gradientHeader: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30, // Adjust for status bar height
        position: 'relative', // Allow positioning for back button
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    backButton: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1, // Center the title
    },

    headerGradient: {
        paddingTop: 50, // Adjust for safe area (especially on iOS)
        paddingBottom: 20,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    navTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 12,
    },
    pageHeader: {
        paddingVertical: 10,
        paddingLeft: 20,
    },
    pageHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default HomeStack;


{/* <LinearGradient
    colors={['#1488CC', '#2B32B2']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradientHeader}
>
    <View style={styles.headerContent}>
        <Text
            style={styles.backButton}
            onPress={() => navigation.goBack()} // Go back to the previous screen
        >
            ←
        </Text>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
</LinearGradient> */}