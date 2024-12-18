import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons

interface HolidayCardProps {
    holidayTitle: string | null;
    startDate: string | null;
    endDate: string | null;
    duration: number | null;
}

const HolidayCard: React.FC<HolidayCardProps> = ({
    holidayTitle,
    startDate,
    endDate,
    duration,
}) => {
    return (
        <View style={styles.card}>
            {/* Title */}
            <Text style={styles.title}>{holidayTitle}</Text>

            {/* Dates */}
            <View style={styles.dateRow}>
                <Icon name="calendar" size={16} color="#6B7280" />
                <Text style={styles.dateText}>
                    {`${moment(startDate).format('MMM DD, YYYY')} - ${moment(endDate).format('MMM DD, YYYY')}`}
                </Text>
            </View>

            {/* Duration Badge */}
            <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{`${duration} days`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderLeftWidth: 4,
        borderColor: '#2563EB',
        marginVertical: 8,
        position: 'relative',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 12,
        color: '#6B7280',
    },
    durationBadge: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#E0EAFF',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    durationText: {
        color: '#2563EB',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default HolidayCard;
