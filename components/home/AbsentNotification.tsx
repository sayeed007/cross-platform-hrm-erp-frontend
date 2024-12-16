import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Icon library for the warning icon

interface AbsentNotificationProps {
    onLinkPress: () => void; // Function with no parameters and no return value
}

const AbsentNotification: React.FC<AbsentNotificationProps> = ({ onLinkPress }) => {
    return (
        <View style={styles.container}>
            <MaterialIcons
                // name="error-outline"
                name="warning"
                size={24} color="#FFA726" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.message}>
                    You were absent for 2 days. Please submit your leave request.{' '}
                    <Text style={styles.link} onPress={onLinkPress}>
                        See absent days
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#FFA726', // Orange border
        elevation: 2, // Shadow effect for Android
        shadowColor: '#000', // Shadow effect for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 16,
    },
    icon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    message: {
        fontSize: 14,
        color: '#333333',
        lineHeight: 20,
    },
    link: {
        color: '#285FEC', // Blue color for link
        fontWeight: 'bold',
    },
});

export default AbsentNotification;
