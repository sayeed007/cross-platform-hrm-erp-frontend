import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import shadowStyles from '../../utils/shadowStyles';
import moment from 'moment';
import { GenerateAndViewIcon } from '../common/GenerateAndSHowIcon';

interface SmallCard {
    name: string; // Name of the card (e.g., "Absent", "Late")
    count: number; // Count value (e.g., 2, 3)
    color: string; // Border & active color for the card
    bgColor: string; // Background color for the card 
}

interface SummaryCardProps {
    cards: SmallCard[]; // Array of card data
    selectedAttendanceStatus: string; // Selected card name
    setSelectedAttendanceStatus: (status: string) => void; // Setter for selected card
    selectedMonthYear: string;
    setSelectedMonthYear: (status: string) => void; // Setter for selected card
    monthYearSelectionModalVisible: boolean;
    setMonthYearSelectionModalVisible: (visible: boolean) => void;
}

const AttendanceSummaryCard: React.FC<SummaryCardProps> = ({
    cards,
    selectedAttendanceStatus,
    setSelectedAttendanceStatus,
    selectedMonthYear,
    setSelectedMonthYear,
    monthYearSelectionModalVisible,
    setMonthYearSelectionModalVisible
}) => {



    return (
        <View style={styles.summaryCard}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>Summary</Text>

                <TouchableOpacity
                    onPress={() => setMonthYearSelectionModalVisible(true)}
                    style={styles.monthYearSelectionButton}
                >
                    <Text style={styles.monthYearText}>
                        {selectedMonthYear}
                    </Text>

                    <GenerateAndViewIcon
                        iconName={monthYearSelectionModalVisible ? "triangleUp" : "triangleDown"}
                        size={12}
                    />
                </TouchableOpacity>
            </View>

            {/* Small Cards */}
            <View style={styles.cardContainer}>
                {cards.map((card, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.smallCard,
                            {
                                backgroundColor:
                                    selectedAttendanceStatus === card.name
                                        ? card.color
                                        : card.bgColor,
                                borderColor: card.color,
                            },
                        ]}
                        onPress={() => {
                            selectedAttendanceStatus === card.name
                                ? setSelectedAttendanceStatus('')
                                : setSelectedAttendanceStatus(card.name)
                        }}
                    >
                        <Text
                            style={[
                                styles.cardCount,
                                {
                                    color:
                                        selectedAttendanceStatus === card.name
                                            ? colors.white
                                            : card.color,
                                },
                            ]}
                        >
                            {card.count}
                        </Text>
                        <Text
                            style={[
                                styles.cardName,
                                {
                                    color:
                                        selectedAttendanceStatus === card.name
                                            ? colors.white
                                            : colors.gray1,
                                },
                            ]}
                        >
                            {card.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryCard: {
        backgroundColor: colors?.white,
        paddingHorizontal: 16,
        paddingVertical: 30,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flex: 1,
        width: Platform.OS === 'web' ? '92%' : '100%',
        top: -150,
        left: '4%',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    date: {
        ...textStyle.regular14,
        color: colors.blue,
    },
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallCard: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardCount: {
        ...textStyle.bold20,
        marginBottom: 4,
    },
    cardName: {
        ...textStyle.regular12,
    },
    monthYearSelectionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    monthYearText: {
        ...textStyle.medium12,
        color: colors.blue,
        marginRight: 8,
    },
});

export default AttendanceSummaryCard;
