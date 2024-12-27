import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Image,
} from "react-native";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import { FontAwesome } from "@expo/vector-icons";
import { LeaveApprovalRequest } from '../../typeInterfaces/LeaveApprovalRequest';
import { LinearGradient } from "expo-linear-gradient";
import Feather from '@expo/vector-icons/Feather';
import { BASE_URL } from "../../Server";
import { Avatar } from "react-native-elements";
import { generateLeaveType, getLeaveStatusText } from "../../utils/leaveUtils";
import moment from "moment";
import { getFileIcon } from "../../utils/fileTypeIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FileDownload } from "../common/FileDownload";
import EmployeeAvatar from "../common/EmployeeAvatar";

interface LeaveRequestDetailsProps {
    isVisible: boolean;
    leaveRequestDetails: Partial<LeaveApprovalRequest>;
    onClose: () => void;
    onApprove: () => void;
    onReject: () => void;
}

const LeaveRequestDetails: React.FC<LeaveRequestDetailsProps> = ({
    isVisible,
    leaveRequestDetails,
    onClose,
    onApprove,
    onReject,
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
        attachmentPath
    } = leaveRequestDetails;
    const senderImage = null;

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
                            <Text style={styles.headerText}>Leave Request Approval</Text>
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
                            </View>

                            {/* Details */}
                            <ScrollView style={styles.detailsContainer}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Leave Type:</Text>
                                    <Text style={styles.detailValue}>
                                        {generateLeaveType(leaveType ?? '')}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Timeline:</Text>
                                    <Text style={styles.detailValue}>
                                        {`${moment(startDate).format('ddd, Do MMM')} - ${moment(endDate).format('ddd, Do MMM')}`} ({duration} Days)
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Applied on:</Text>
                                    <Text style={styles.detailValue}>
                                        {moment(sendingDate, 'YYYY-MM-DD').format('MMM DD, YYYY')}
                                        Aug 21, 2023
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Description:</Text>
                                    <Text style={styles.detailValue}>
                                        {message}
                                    </Text>
                                </View>


                                <FileDownload
                                    attachmentPath={attachmentPath ?? ''}
                                />
                                {/* <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Documents:</Text>
                                    {attachmentPath ?
                                        <TouchableOpacity style={styles.documentContainer}>
                                            <FontAwesome name={getFileIcon(attachmentPath)} size={16} color={colors.info} />
                                            <Text style={styles.documentText}>
                                                {attachmentPath}
                                            </Text>
                                        </TouchableOpacity>
                                        :
                                        <Text style={styles.detailValue}>
                                            No uploaded document
                                        </Text>
                                    }
                                </View> */}
                            </ScrollView>

                            {/* Action Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.rejectButton]}
                                    onPress={onReject}
                                >
                                    <Ionicons name="close" size={24} color={colors.error} />
                                    <Text style={styles.rejectButtonText}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.approveButton]}
                                    onPress={onApprove}
                                >
                                    <Ionicons name="checkmark" size={24} color={colors.white} />
                                    <Text style={styles.approveButtonText}>Approve</Text>
                                </TouchableOpacity>
                            </View>

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
    },
    gradientHeader: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 70,
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
    },
    detailsContainer: {
        marginTop: 120,
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
        flex: 1,
    },
    detailValue: {
        ...textStyle.bold14,
        color: colors.black,
        flex: 2,
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
    rejectButton: {
        borderWidth: 1,
        borderColor: colors.error,
    },
    approveButton: {
        backgroundColor: colors.success,
    },
    rejectButtonText: {
        ...textStyle.semibold14,
        color: colors.error,
        marginLeft: 10
    },
    approveButtonText: {
        ...textStyle.semibold14,
        color: colors.white,
        marginLeft: 10
    },
});

export default LeaveRequestDetails;


