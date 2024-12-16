import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SeeAllCoWorkersContactScreen from '../screens/SeeAllCoWorkersContactScreen';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient for Expo projects

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
        colors={['#1488CC', '#2B32B2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
    >
        <View style={styles.headerContent}>
            {/* Back Button */}
            <Text
                style={styles.backButton}
                onPress={() => navigation.goBack()} // Go back to the previous screen
            >
                ←
            </Text>

            {/* Title */}
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    </LinearGradient>
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
});

export default HomeStack;
