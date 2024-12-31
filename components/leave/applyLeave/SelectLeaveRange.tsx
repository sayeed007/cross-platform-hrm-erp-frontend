import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { CalendarList } from "react-native-calendars"; // Install using `npm install react-native-calendars`
import { colors } from "../../../utils/colors";
import { textStyle } from "../../../utils/textStyle";

interface SelectLeaveRangeProps {
    startDate: string | null;
    setStartDate: (date: string | null) => void;
    endDate: string | null;
    setEndDate: (date: string | null) => void;
    onNext: () => void; // Callback for the Next button
}

const SelectLeaveRange: React.FC<SelectLeaveRangeProps> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onNext,
}) => {
    const handleDayPress = (day: { dateString: string }) => {
        const selectedDate = day.dateString;

        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (new Date(selectedDate) >= new Date(startDate)) {
                setEndDate(selectedDate);
            } else {
                setStartDate(selectedDate);
                setEndDate(null);
            }
        }
    };

    const calculateDays = () => {
        if (startDate && endDate) {
            const fromDate = new Date(startDate);
            const untilDate = new Date(endDate);
            const diff = Math.ceil(
                (untilDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            return diff + 1; // Include both start and end dates
        }
        return 0;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Leave Request</Text>
            </View>

            {/* Calendar */}
            <CalendarList
                pastScrollRange={0}
                futureScrollRange={12}
                scrollEnabled
                showScrollIndicator={false}
                horizontal
                markingType={"period"}
                onDayPress={handleDayPress}
                markedDates={{
                    ...(startDate && { [startDate]: { startingDay: true, color: colors.blue, textColor: colors.white } }),
                    ...(endDate && { [endDate]: { endingDay: true, color: colors.blue, textColor: colors.white } }),
                    ...(startDate &&
                        endDate && {
                        [startDate]: { startingDay: true, color: colors.blue, textColor: colors.white },
                        [endDate]: { endingDay: true, color: colors.blue, textColor: colors.white },
                    }),
                }}
                theme={{
                    calendarBackground: colors.white,
                    textDayFontFamily: "System",
                    textMonthFontFamily: "System",
                    textDayHeaderFontFamily: "System",
                    todayTextColor: colors.blue,
                    dayTextColor: colors.black,
                    monthTextColor: colors.black,
                    selectedDayBackgroundColor: colors.blue,
                    arrowColor: colors.blue,
                }}
                style={styles.calendar}
            />

            {/* Leave Summary */}
            <View style={styles.summaryContainer}>
                <View style={styles.dateRow}>
                    <View style={styles.dateItem}>
                        <Text style={styles.dateLabel}>From</Text>
                        <Text style={styles.dateValue}>{startDate || "-"}</Text>
                    </View>
                    <Text style={styles.arrow}>→</Text>
                    <View style={styles.dateItem}>
                        <Text style={styles.dateLabel}>Until</Text>
                        <Text style={styles.dateValue}>{endDate || "-"}</Text>
                    </View>
                </View>

                <View style={styles.daysRow}>
                    <Text style={styles.daysText}>Leave days: {calculateDays()}</Text>
                    <Text style={styles.daysText}>
                        Calendar days: {calculateDays()}
                    </Text>
                </View>
            </View>

            {/* Next Button */}
            <TouchableOpacity
                style={[
                    styles.nextButton,
                    !(startDate && endDate) && styles.disabledButton,
                ]}
                disabled={!(startDate && endDate)}
                onPress={onNext}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: "#F9F9F9",
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: "center",
    },
    title: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    calendar: {
        marginBottom: 20,
        borderRadius: 8,
        overflow: "hidden",
    },
    summaryContainer: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    dateItem: {
        alignItems: "center",
    },
    dateLabel: {
        ...textStyle.medium14,
        color: colors.gray2,
    },
    dateValue: {
        ...textStyle.semibold16,
        color: colors.black,
        marginTop: 4,
    },
    arrow: {
        ...textStyle.medium16,
        color: colors.gray2,
    },
    daysRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    daysText: {
        ...textStyle.medium14,
        color: colors.gray2,
    },
    nextButton: {
        backgroundColor: colors.blue,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: colors.gray3,
    },
    nextButtonText: {
        ...textStyle.semibold16,
        color: colors.white,
    },
});

export default SelectLeaveRange;
