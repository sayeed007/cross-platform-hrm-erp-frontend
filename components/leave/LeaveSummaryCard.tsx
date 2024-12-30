import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import { useUser } from "../../context/UserContext";
import { getActualAndRemainingLeaveCount } from "../../apis/Leave";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { hexToRgba } from "../../utils/hexToRgba";

const { width } = Dimensions.get("window");

interface SummaryCardProps {
    selectedYear: string;
    monthYearSelectionModalVisible: boolean;
    setMonthYearSelectionModalVisible: (visible: boolean) => void;
};

interface LeaveData {
    leaveType: string; // The type of leave (e.g., "casual", "sick").
    actualLeaveCount: number; // The total count of leaves allotted.
    remainingLeaveCount: number; // The remaining count of leaves.
    leaveColor: string | null; // Hex color for the leave type, can be null.
}

const LeaveSummaryCard: React.FC<SummaryCardProps> = ({
    selectedYear,
    monthYearSelectionModalVisible,
    setMonthYearSelectionModalVisible,
}) => {
    const { user } = useUser();
    const [actualAndRemainingLeaveCount, setActualAndRemainingLeaveCount] =
        useState<LeaveData[]>([]);
    const [currentPage, setCurrentPage] = useState(0); // For pagination indicator

    // Fetch leave data
    useEffect(() => {
        if (user?.employeeId) {
            getActualAndRemainingLeaveCount(user?.employeeId, user?.employeeId).then(
                (response) => {
                    if (response[0]) {
                        setActualAndRemainingLeaveCount(response[0]);
                    } else {
                        setActualAndRemainingLeaveCount([]);
                    }
                }
            );
        }
    }, [user?.employeeId]);

    // Split leave data into chunks of 2 items per card
    const groupedLeaveData = [];
    for (let i = 0; i < actualAndRemainingLeaveCount.length; i += 2) {
        groupedLeaveData.push(actualAndRemainingLeaveCount.slice(i, i + 2));
    }

    // Handle pagination
    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentPage(index);
    };

    return (
        <View style={styles.summaryCard}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>Summary</Text>
                <TouchableOpacity
                    onPress={() => setMonthYearSelectionModalVisible(true)}
                    style={styles.monthYearSelectionButton}
                >
                    <Text style={styles.monthYearText}>{selectedYear}</Text>
                    <AntDesign
                        name={monthYearSelectionModalVisible ? "caretup" : "caretdown"}
                        size={12}
                        color={colors.blue}
                    />
                </TouchableOpacity>
            </View>

            {/* FlatList for Cards */}
            <FlatList
                horizontal
                data={groupedLeaveData}
                keyExtractor={(item, index) => `group-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        {item.map((leave, idx) => {
                            const leaveColor = leave.leaveColor || colors.gray2;
                            const leaveTextColor = leave.leaveColor || colors.black;

                            return (
                                <View
                                    key={idx}
                                    style={[
                                        styles.card,
                                        {
                                            borderColor: leaveColor,
                                            backgroundColor: hexToRgba(leaveColor)
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.count,
                                            { color: leaveTextColor },
                                        ]}
                                    >
                                        {leave?.remainingLeaveCount?.toFixed(2)}
                                    </Text>
                                    <Text style={styles.leaveType}>
                                        Remaining {capitalizeFirstLetter(leave.leaveType)}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={handleScroll}
                contentContainerStyle={styles.listContent}
            />

            {/* Pagination Indicator */}
            <View style={styles.paginationContainer}>
                {groupedLeaveData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentPage === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryCard: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 30,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        flex: 1,
        width: Platform.OS === 'web' ? '92%' : '100%',
        top: -150,
        left: '4%',
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    title: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    monthYearSelectionButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    monthYearText: {
        ...textStyle.medium12,
        color: colors.blue,
        marginRight: 8,
    },
    cardContainer: {
        flexDirection: "row",
        width: width - 40, // Adjust card width to match screen
        justifyContent: "space-between",
    },
    card: {
        flex: 1,
        backgroundColor: colors.offWhite1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    count: {
        ...textStyle.bold20,
        marginBottom: 8,
    },
    leaveType: {
        ...textStyle.medium12,
        color: colors.black,
        textAlign: "center",
    },
    paginationContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.gray2,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: colors.blue,
    },
    listContent: {
        paddingVertical: 16,
    },
});

export default LeaveSummaryCard;
