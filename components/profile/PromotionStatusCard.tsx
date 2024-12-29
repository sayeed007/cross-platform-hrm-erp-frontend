import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SalaryInfo } from "../../typeInterfaces/User";
import { colors } from "../../utils/colors";
import shadowStyles from "../../utils/shadowStyles";
import ProfileIndividualDetails from "./ProfileIndividualDetails";

type PromotionStatusCardProps = {
    promotionInfo: SalaryInfo; // Props for the SalaryStatusCard
};

const PromotionStatusCard: React.FC<PromotionStatusCardProps> = ({ promotionInfo }) => {
    const { effectiveDate, designationName, departmentName, companyName } = promotionInfo;

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
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Salary Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <ProfileIndividualDetails
                        title={'Designation'}
                        value={designationName}
                        index={'Designation'}
                    />
                </View>
                <View style={styles.detailItem}>
                    <ProfileIndividualDetails
                        title={'Department'}
                        value={departmentName}
                        index={'Department'}
                    />
                </View>
                <View style={{ ...styles.detailItem, width: '100%' }}>
                    <ProfileIndividualDetails
                        title={'Company'}
                        value={companyName}
                        index={'Company'}
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

export default PromotionStatusCard;
