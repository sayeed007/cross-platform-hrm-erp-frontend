import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';
import { textStyle } from '../../utils/textStyle';
import { GenerateAndViewIcon } from '../common/GenerateAndSHowIcon';

interface AbsentNotificationProps {
    onLinkPress: () => void; // Function with no parameters and no return value
}

const AbsentNotification: React.FC<AbsentNotificationProps> = ({ onLinkPress }) => {
    return (
        <View style={styles.container}>
            <GenerateAndViewIcon
                iconName="Warning"
                size={24}
                style={styles.icon}
            />
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
        backgroundColor: colors?.white,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: colors?.orange, // Orange border
        marginBottom: 16,
        ...shadowStyles?.popUpShadow2
    },
    icon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    message: {
        ...textStyle?.regular14,
        color: colors?.black,
        lineHeight: 20,
    },
    link: {
        color: colors?.info, // Blue color for link
        ...textStyle?.bold13,

    },
});

export default AbsentNotification;
