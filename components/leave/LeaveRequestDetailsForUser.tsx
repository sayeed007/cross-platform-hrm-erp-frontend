import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { LeaveApprovalRequest } from '../../typeInterfaces/LeaveApprovalRequest';
import { colors } from "../../utils/colors";
import { generateLeaveType, getLeaveStatusText, getStatusStyle } from "../../utils/leaveUtils";
import { textStyle } from "../../utils/textStyle";
import EmployeeAvatar from "../common/EmployeeAvatar";
import { FileDownload } from "../common/FileDownload";

interface LeaveRequestDetailsForUserProps {
    isVisible: boolean;
    leaveRequestDetails: Partial<LeaveApprovalRequest>;
    onClose: () => void;
    onEdit: () => void;
    onCancel: () => void;
}

const LeaveRequestDetailsForUser: React.FC<LeaveRequestDetailsForUserProps> = ({
    isVisible,
    leaveRequestDetails,
    onClose,
    onEdit,
    onCancel,
}) => {

    const {
        senderFirstName,
        senderLastName,
        senderId,
        departmentName,
        designationName,
        leaveType,
        startDate,
        endDate,
        duration,
        sendingDate,
        message,
        attachmentPath,
        isAccepted: status,
        isAcceptedByLineManager,
        actionDateByLineManager,
        isAcceptedByTeamLeader,
        actionDateByTeamLeader,
        isAcceptedByHeadOfDept,
        actionDateByHeadOfDept,
        isAcceptedByAdmin
    } = leaveRequestDetails;
    const senderImage = null;

    const canTakeAction = (isAcceptedByLineManager === 0 && status !== 1 && isAcceptedByAdmin == 0);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOuterContainer}
                onPress={onClose} // Close the modal when pressed outside
            >

                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <View style={styles.modalContent}>

                        {/* Header */}
                        <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.gradientHeader}>
                            <TouchableOpacity onPress={onClose}>
                                <Feather name="arrow-left" size={24} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>Sent Leave Details</Text>
                            <Text></Text>
                        </LinearGradient>

                        <View style={styles.modalContainerDetails}>

                            {/* User Info */}
                            <View style={styles.userInfoContainer}>
                                <EmployeeAvatar
                                    profileShowImage={senderImage ?? ''}
                                    label={`${senderFirstName?.charAt(0)}${senderLastName?.charAt(0)}`}
                                    size={100}
                                />

                                <Text style={styles.userName}>
                                    {senderFirstName} {senderLastName} - {senderId}
                                </Text>
                                <Text style={styles.userDesignation}>
                                    {departmentName} | {designationName}
                                </Text>

                                <Text style={getStatusStyle(status ?? 0)}>{getLeaveStatusText(status ?? 0)}</Text>
                            </View>

                            {/* Details */}
                            <ScrollView
                                contentContainerStyle={{ flexGrow: 1 }}
                                scrollEnabled={true}
                                nestedScrollEnabled={true}
                                style={[
                                    styles.detailsContainer,
                                    { maxHeight: canTakeAction ? '65%' : '75%' }
                                ]}
                            >
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Leave Type</Text>
                                    <Text style={styles.detailValue}>
                                        {generateLeaveType(leaveType ?? '')}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Timeline</Text>
                                    <Text style={styles.detailValue}>
                                        {`${moment(startDate).format('ddd, Do MMM')} - ${moment(endDate).format('ddd, Do MMM')}`} ({duration} Days)
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Applied on</Text>
                                    <Text style={styles.detailValue}>
                                        {moment(sendingDate, 'YYYY-MM-DD').format('MMM DD, YYYY')}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Description</Text>
                                    <Text style={styles.detailValue}>
                                        {message}
                                    </Text>
                                </View>


                                <FileDownload
                                    attachmentPath={attachmentPath ?? ''}
                                />

                                {/* ACTIONS */}
                                <View style={styles.actionContainer}>
                                    <Text style={styles.detailLabel}>Action By</Text>

                                    <View style={styles.actionList}>
                                        <Text style={styles.detailLabel}>Line Manager : </Text>
                                        <Text style={styles.detailValue}>
                                            {getLeaveStatusText(isAcceptedByLineManager ?? 0)}
                                            {isAcceptedByLineManager !== 0 && ` (${moment(actionDateByLineManager).format('MMM DD, YYYY')})`}
                                        </Text>
                                    </View>

                                    <View style={styles.actionList}>
                                        <Text style={styles.detailLabel}>Dotted Manager 1 : </Text>
                                        <Text style={styles.detailValue}>
                                            {getLeaveStatusText(isAcceptedByTeamLeader ?? 0)}
                                            {isAcceptedByTeamLeader !== 0 && ` (${moment(actionDateByTeamLeader).format('MMM DD, YYYY')})`}
                                        </Text>
                                    </View>

                                    <View style={styles.actionList}>
                                        <Text style={styles.detailLabel}>Dotted Manager 2 : </Text>
                                        <Text style={styles.detailValue}>
                                            {getLeaveStatusText(isAcceptedByHeadOfDept ?? 0)}
                                            {isAcceptedByHeadOfDept !== 0 && ` (${moment(actionDateByHeadOfDept).format('MMM DD, YYYY')})`}
                                        </Text>
                                    </View>
                                </View>

                            </ScrollView>

                            {/* Action Buttons */}
                            {canTakeAction &&
                                <View style={styles.buttonContainer}>
                                    {/* Edit */}
                                    <TouchableOpacity
                                        style={[styles.button, styles.editButton]}
                                        onPress={onEdit}
                                    >
                                        <Ionicons name="create-outline" size={24} color={colors.warning} />
                                        <Text style={styles.editButtonText}>Edit</Text>
                                    </TouchableOpacity>

                                    {/* Cancel */}
                                    <TouchableOpacity
                                        style={[styles.button, styles.cancelButton]}
                                        onPress={onCancel}
                                    >
                                        <Ionicons name="close" size={24} color={colors.white} />
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>

                    </View>
                </TouchableOpacity>

            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        backgroundColor: colors.modalBG,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: '90%',
    },
    gradientHeader: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 50,
    },
    headerText: {
        ...textStyle.regular16,
        color: colors.white,
    },
    modalContainerDetails: {
        paddingHorizontal: 15,
        paddingBottom: 20,
        position: 'relative',
    },
    userInfoContainer: {
        alignItems: "center",
        position: 'absolute',
        top: -50,
        textAlign: 'center',
        alignSelf: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 32,
        backgroundColor: colors.gray3,
        marginBottom: 12,
    },
    userName: {
        ...textStyle.semibold16,
        color: colors.black,
        marginTop: 10,
    },
    userDesignation: {
        ...textStyle.regular13,
        color: colors.gray2,
        marginBottom: 10,
    },
    detailsContainer: {
        marginTop: 150,
        borderTopWidth: 1,
        borderTopColor: colors.offWhite5,
        paddingTop: 15,
    },
    detailRow: {
        marginBottom: 15,
    },
    detailLabel: {
        ...textStyle.regular14,
        color: colors.gray2,
    },
    detailValue: {
        ...textStyle.bold14,
        color: colors.black,
    },
    documentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    documentText: {
        ...textStyle.regular14,
        color: colors.black,
        marginLeft: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
        marginTop: 15,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center',
    },
    editButton: {
        borderWidth: 1,
        borderColor: colors.warning,
        backgroundColor: colors.warningBG,
    },
    cancelButton: {
        backgroundColor: colors.error,
    },
    editButtonText: {
        ...textStyle.semibold14,
        color: colors.warning,
        marginLeft: 10
    },
    cancelButtonText: {
        ...textStyle.semibold14,
        color: colors.white,
        marginLeft: 10
    },
    actionContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.offWhite5,
        paddingTop: 15,
    },
    actionList: {
        flexDirection: 'row'
    }
});

export default LeaveRequestDetailsForUser;


