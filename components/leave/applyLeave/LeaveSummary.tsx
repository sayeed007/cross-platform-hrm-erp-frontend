import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from "react-native";
import { colors } from "../../../utils/colors";
import { textStyle } from "../../../utils/textStyle";
import moment from "moment";
import { calculateCalenderDays } from "../../../utils/leaveUtils";
import { GenerateAndViewIcon } from "../../common/GenerateAndSHowIcon";

interface LeaveSummaryProps {
    startDate: string;
    endDate: string;
    leaveDays: number;
    leaveInfoText: string;
    leaveDurationText: string;
}

const LeaveSummary: React.FC<LeaveSummaryProps> = ({
    startDate,
    endDate,
    leaveDays,
    leaveInfoText,
    leaveDurationText,
}) => {
    const [tooltipVisible, setTooltipVisible] = React.useState(false);




    return (
        <View style={styles.summaryContainer}>
            <View style={styles.dateRow}>
                <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>From</Text>
                    <Text style={styles.dateValue}>{moment(startDate).format('ddd, MMM DD') || "-"}</Text>
                    <View style={styles.leaveDaysInfoContainer}>
                        <Text style={styles.daysText}>Leave days: {leaveDays}</Text>

                        {/* Info Icon and Tooltip */}
                        <TouchableOpacity
                            style={styles.infoContainer}
                            onPress={() => setTooltipVisible(true)}
                        >
                            <GenerateAndViewIcon
                                iconName="info"
                                size={16}
                            />
                        </TouchableOpacity>

                        {/* Modal Tooltip */}
                        <Modal
                            visible={tooltipVisible}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setTooltipVisible(false)}
                        >
                            <Pressable style={styles.modalOverlay} onPress={() => setTooltipVisible(false)}>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalText}>
                                        Includes total duration in {leaveDurationText}. {leaveInfoText}
                                    </Text>
                                </View>
                            </Pressable>
                        </Modal>
                    </View>
                </View>

                {/* Arrow Icon */}
                <GenerateAndViewIcon
                    iconName="longArrowRight"
                    size={36}
                />
                <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>Until</Text>
                    <Text style={styles.dateValue}>{moment(endDate).format('ddd, MMM DD') || "-"}</Text>
                    <Text style={styles.daysText}>
                        Calendar days: {calculateCalenderDays(startDate, endDate)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    dateItem: {},
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
    daysText: {
        ...textStyle.medium14,
        color: colors.gray2,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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

export default LeaveSummary;
