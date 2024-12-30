import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import shadowStyles from "../../utils/shadowStyles";
import ProfileIndividualDetails from "./ProfileIndividualDetails";
import { SalaryInfo } from "../../typeInterfaces/User";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

type SalaryStatusCardProps = {
    salaryInfo: SalaryInfo; // Props for the SalaryStatusCard
};

const SalaryStatusCard: React.FC<SalaryStatusCardProps> = ({ salaryInfo }) => {
    const { effectiveDate
        , status, amount, incrementAmount, percentage, bankAmount, cashAmount } = salaryInfo;

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <ProfileIndividualDetails
                        title={'Effective from'}
                        value={moment(effectiveDate, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
                        index={'Effective from'}
                    />
                </View>
                <View style={styles.incrementBadge}>
                    <Text style={styles.incrementText}>
                        {capitalizeFirstLetter(status)}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Salary Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <ProfileIndividualDetails
                        title={'Amount'}
                        value={amount.toLocaleString()}
                        index={'Amount'}
                    />
                </View>
                <View style={styles.detailItem}>
                    <ProfileIndividualDetails
                        title={'Increment'}
                        value={`${incrementAmount.toLocaleString()} (${percentage.toFixed(3)}%)`}
                        index={'Increment'}
                    />
                </View>
                <View style={styles.detailItem}>
                    <ProfileIndividualDetails
                        title={'Bank Amount'}
                        value={bankAmount.toLocaleString()}
                        index={'Bank Amount'}
                    />
                </View>
                <View style={styles.detailItem}>
                    <ProfileIndividualDetails
                        title={'Cash Amount'}
                        value={cashAmount.toLocaleString()}
                        index={'Cash Amount'}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 16,
        marginVertical: 16,
        ...shadowStyles.popUpShadow2
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    effectiveLabel: {
        color: "#6B7280", // Gray-600
        fontSize: 14,
    },
    effectiveDate: {
        color: "#111827", // Gray-900
        fontSize: 16,
        fontWeight: "bold",
    },
    incrementBadge: {
        backgroundColor: colors.successBG,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    incrementText: {
        color: colors.success,
        fontSize: 14,
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB", // Gray-300
        marginVertical: 16,
    },
    detailsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    detailItem: {
        width: "48%",
        marginBottom: 8,
    },
    detailLabel: {
        color: "#6B7280", // Gray-600
        fontSize: 14,
    },
    detailValue: {
        color: "#111827", // Gray-900
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SalaryStatusCard;
