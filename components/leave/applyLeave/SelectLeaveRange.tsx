import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Pressable } from "react-native";
import { CalendarList } from "react-native-calendars";
import { colors } from "../../../utils/colors";
import { textStyle } from "../../../utils/textStyle";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { getIsLFAEncashableOrNot, getLeaveDaysBasedOnSelectedCriteria } from "../../../apis/Leave";
import { useUser } from "../../../context/UserContext";
import { LeavePeriod } from "./ApplyLeaveModal";
import LeaveSummary from "./LeaveSummary";
import { GenerateAndViewIcon } from "../../common/GenerateAndSHowIcon";


interface SelectLeaveRangeProps {
    selectedLeaveType: string;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    leaveDays: number;
    setLeaveDays: (days: number) => void;
    leavePeriod: string;
    setLeavePeriod: React.Dispatch<React.SetStateAction<LeavePeriod>>;
    isLfaEncashment: boolean;
    setLfaEncashment: (encashment: boolean) => void;
    onNext: () => void; // Callback for the Next button
}

const SelectLeaveRange: React.FC<SelectLeaveRangeProps> = ({
    selectedLeaveType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    leaveDays,
    setLeaveDays,
    isLfaEncashment,
    setLfaEncashment,
    leavePeriod,
    setLeavePeriod,
    onNext,
}) => {
    const { user } = useUser();
    const configurableLeaves = [...(user?.employeeInfo?.leavePolicy?.configurableLeaves || [])];
    const leaveConfig = configurableLeaves.find(
        (leave) => leave.leaveType === selectedLeaveType
    );

    const leaveInfoText = leaveConfig?.leaveDeduction === "CALENDAR_DAYS"
        ? "Government holiday and weekend will be counted as leave days."
        : "Government holiday and weekend will not be counted as leave days.";

    const leaveDurationText = leaveConfig?.leaveDeduction?.replace("_", " ") || "N/A";

    // const [calenderDays, setCalenderDays] = useState<number>(0);
    const [lfaEncashable, setLfaEncashable] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        if (selectedLeaveType && startDate && endDate && leavePeriod) {
            fetchLeaveDays();
        }
    }, [user?.employeeId, selectedLeaveType, startDate, endDate, leavePeriod])

    useEffect(() => {
        if (selectedLeaveType === 'lfa' && leaveDays >= 5) {
            fetchEncashment()
        } else {
            setLfaEncashable(false)
        }
    }, [leaveDays]);


    const handleDayPress = (day: { dateString: string }) => {
        const selectedDate = day.dateString;

        if (!startDate && !endDate) {
            // Initialize both start and end with the selected date
            setStartDate(selectedDate);
            setEndDate(selectedDate);
            return;
        }

        if (startDate === endDate && startDate) {
            // Ensure startDate is not null
            if (new Date(selectedDate) >= new Date(startDate)) {
                // If the selected date is after or equal to the start date, set it as the end date
                setEndDate(selectedDate);
            } else {
                // Otherwise, reset the start and end dates
                setStartDate(selectedDate);
                setEndDate(selectedDate);
            }
            return;
        }

        // Reset the range with the selected date as both startDate and endDate
        setStartDate(selectedDate);
        setEndDate(selectedDate);
    };

    const getMarkedDates = () => {
        const marked: Record<string, any> = {};

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Iterate through the range of dates
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateString = d.toISOString().split("T")[0];

                if (dateString === startDate && dateString === endDate) {
                    // Both start and end date are the same
                    marked[dateString] = {
                        startingDay: true,
                        endingDay: true,
                        color: colors.info,
                        textColor: colors.white,
                    };
                } else if (dateString === startDate) {
                    // Start date styling
                    marked[dateString] = {
                        startingDay: true,
                        color: colors.info,
                        textColor: colors.white,
                    };
                } else if (dateString === endDate) {
                    // End date styling
                    marked[dateString] = {
                        endingDay: true,
                        color: colors.info,
                        textColor: colors.white,
                    };
                } else {
                    // Middle dates styling
                    marked[dateString] = {
                        color: colors.info,
                        textColor: colors.white,
                    };
                }
            }
        }

        return marked;
    };



    const fetchLeaveDays = () => {
        if (user?.employeeId) {
            getLeaveDaysBasedOnSelectedCriteria(user?.employeeId, startDate, endDate, selectedLeaveType, leavePeriod).then((leaveDaysResponse) => {
                if (leaveDaysResponse?.[0]) {
                    setLeaveDays(leaveDaysResponse?.[0]);
                } else {
                    setLeaveDays(0);
                }
            })
        }
    };

    const fetchEncashment = async () => {
        if (user?.employeeId && startDate) {
            getIsLFAEncashableOrNot(user?.employeeId, startDate).then((encashableResponse) => {
                if (encashableResponse?.[0]) {
                    setLfaEncashable(encashableResponse?.[0])
                } else {
                    setLfaEncashable(false)
                }
            })
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Calendar */}
                <CalendarList
                    pastScrollRange={2}
                    futureScrollRange={1}
                    scrollEnabled
                    horizontal={false}
                    markingType="period"
                    onDayPress={handleDayPress}
                    markedDates={getMarkedDates()}
                    current={moment(startDate).format("YYYY-MM-DD") || moment().format("YYYY-MM-DD")}
                    theme={{
                        calendarBackground: colors.offWhite1,
                        textDayFontFamily: "System",
                        textMonthFontFamily: "System",
                        textDayHeaderFontFamily: "System",
                        todayTextColor: colors.info,
                        dayTextColor: colors.black,
                        monthTextColor: colors.black,
                        selectedDayBackgroundColor: colors.info,
                        arrowColor: colors.info,
                    }}
                    style={styles.calendar}
                />
            </ScrollView>

            {/* Use the new LeaveSummary component */}
            <LeaveSummary
                startDate={startDate}
                endDate={endDate}
                leaveDays={leaveDays}
                leaveInfoText={leaveInfoText}
                leaveDurationText={leaveDurationText}
            />


            {/* Half Day Checkbox */}
            {(leaveDays <= 1 && (leaveConfig?.halfDayAllowed)) &&
                <TouchableOpacity
                    style={styles.optionContainer}
                    onPress={() => setLeavePeriod(leavePeriod === 'HALF_DAY' ? 'oneDay' : 'HALF_DAY')}
                >
                    <GenerateAndViewIcon
                        iconName={leavePeriod === 'HALF_DAY' ? "CheckBox-checked" : "CheckBox"}
                        size={24}
                    />
                    <Text style={styles.optionText}>Want to apply Half day</Text>
                </TouchableOpacity>
            }


            {/* Encashment Checkbox */}
            {lfaEncashable &&
                <TouchableOpacity
                    style={styles.optionContainer}
                    onPress={() => setLfaEncashment(!isLfaEncashment)}
                >
                    <GenerateAndViewIcon
                        iconName={isLfaEncashment ? "CheckBox-checked" : "CheckBox"}
                        size={24}
                    />
                    <Text style={styles.optionText}>
                        Want to encash with these leave (You can apply LFA encashment for one time)
                    </Text>
                </TouchableOpacity>
            }

            {/* Next Button */}
            <TouchableOpacity
                disabled={(leaveDays <= 0)}
                onPress={onNext}>
                <LinearGradient
                    colors={(leaveDays <= 0) ?
                        [colors?.offWhite4, colors?.offWhite5]
                        : [colors?.cardGradient?.[0], colors?.cardGradient?.[1]]
                    }
                    style={styles.nextButton}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </LinearGradient>
            </TouchableOpacity >

        </>

    );
};

const styles = StyleSheet.create({
    container: {
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
        marginHorizontal: 20,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: colors.offWhite1,
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
        marginTop: 20,
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    dateItem: {

    },
    dateLabel: {
        ...textStyle.medium14,
        color: colors.gray2,
    },
    dateValue: {
        ...textStyle.semibold16,
        color: colors.black,
        marginVertical: 4,
    },
    leaveDaysInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    arrow: {
        ...textStyle.medium16,
        color: colors.gray2,
    },
    daysRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    daysText: {
        ...textStyle.medium14,
        color: colors.gray2,
    },
    nextButton: {
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    nextButtonText: {
        ...textStyle.semibold16,
        color: colors.white,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    optionText: {
        ...textStyle.medium14,
        color: colors.gray2,
        marginLeft: 8,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoText: {
        ...textStyle.regular12,
        color: colors.gray2,
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContainer: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        maxWidth: "80%",
    },
    modalText: {
        ...textStyle.medium14,
        color: colors.black,
    },
});

export default SelectLeaveRange;
