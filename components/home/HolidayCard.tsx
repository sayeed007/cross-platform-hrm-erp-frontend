import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';

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
                <Icon name="calendar" size={16} color={colors?.gray2} />
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
        backgroundColor: colors?.white,
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderColor: colors?.info,
        marginVertical: 8,
        position: 'relative',
        ...shadowStyles?.popUpShadow2
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors?.black,
        marginBottom: 4,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 12,
        color: colors?.gray2,
    },
    durationBadge: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: colors?.infoBG,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    durationText: {
        color: colors?.info,
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default HolidayCard;
