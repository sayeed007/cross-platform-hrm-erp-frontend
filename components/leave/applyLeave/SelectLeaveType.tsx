import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LeaveDataItem } from "../../../typeInterfaces/Leave";
import { colors } from "../../../utils/colors";


interface SelectLeaveTypeProps {
    leaveData: LeaveDataItem[]; // Array of leave data passed as props
    selectedLeaveType: string;
    onLeaveTypeChoose: (leave: string) => void;
}

const SelectLeaveType: React.FC<SelectLeaveTypeProps> = ({
    leaveData,
    selectedLeaveType,
    onLeaveTypeChoose
}) => {
    const renderLeaveItem = ({ item }: { item: LeaveDataItem }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onLeaveTypeChoose(item.leaveType);
                }}
                style={[
                    styles.leaveItem,
                    selectedLeaveType === item.leaveType ? styles.selectedItem : {}
                ]}>
                {/* Remaining Leave Count */}
                <View style={[styles.leaveCountContainer, { backgroundColor: item.leaveColor || "#E0E0E0" }]}>
                    <Text style={styles.leaveCountText}>
                        {item.remainingLeaveCount % 1 === 0
                            ? item.remainingLeaveCount
                            : item.remainingLeaveCount.toFixed(1)}
                    </Text>
                </View>

                {/* Leave Type */}
                <View style={styles.leaveDetails}>
                    <Text style={styles.leaveTypeText}>{capitalize(item.leaveType)} Leave</Text>
                    <Text style={styles.remainingText}>Remaining</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    return (
        <View style={styles.container}>
            <FlatList
                data={leaveData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderLeaveItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    leaveItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.offWhite5,
        marginBottom: 10,
    },
    selectedItem: {
        backgroundColor: colors.bottomNav,
    },
    leaveCountContainer: {
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    leaveCountText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    leaveDetails: {
        flex: 1,
    },
    leaveTypeText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333333",
    },
    remainingText: {
        fontSize: 14,
        color: "#888888",
    },
});

export default SelectLeaveType;
