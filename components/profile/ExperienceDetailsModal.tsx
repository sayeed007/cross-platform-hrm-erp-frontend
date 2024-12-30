import React from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Experience } from "../../typeInterfaces/User";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import ProfileIndividualDetails from "./ProfileIndividualDetails";
import moment from "moment";
import { capitalizeFirstLetter } from "../../utils/generateTabWiseEmployeeDetails";

type ExperienceDetailsModalProps = {
    isVisible: boolean; // Whether the modal is visible
    onClose: () => void; // Callback function to close the modal
    experience: Experience; // The experience object to display details
};

const ExperienceDetailsModal: React.FC<ExperienceDetailsModalProps> = ({ isVisible, onClose, experience }) => {

    const experienceDetailsData = [
        { 'title': 'Company', value: experience?.company ? experience?.company : 'N/A' },
        { 'title': 'Department', value: experience?.department ? experience?.department : 'N/A' },
        { 'title': 'Designation', value: experience?.designation ? experience?.designation : 'N/A' },
        { 'title': 'Start Date', value: experience?.startDate ? moment(experience?.startDate, 'YYYY-MM-DD').format('MMM, YYYY') : 'N/A' },
        { 'title': 'End Date', value: experience?.endDate ? moment(experience?.endDate, 'YYYY-MM-DD').format('MMM, YYYY') : 'N/A' },
        { 'title': 'Employment Type', value: experience?.employmentType ? capitalizeFirstLetter(experience?.employmentType) : 'N/A' },
    ];

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />
                <View style={styles.modalContent}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="arrow-left" size={24} color={colors.gray1} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Experience Details</Text>
                        <View />
                    </View>

                    <Text style={styles.institution}>{experience.designation}</Text>

                    {/* FlatList */}
                    <FlatList
                        scrollEnabled={false}
                        key={'Experience Details'}
                        data={experienceDetailsData}
                        keyExtractor={(item, index) => `${item.title}-${index}`}
                        renderItem={({ item, index }) => (
                            <ProfileIndividualDetails
                                title={item.title}
                                value={item.value}
                                index={`${item.title}-${index}`}
                            />
                        )}
                        style={{ flex: 1 }}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: colors.modalBG,
    },
    modalOverlay: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    institution: {
        ...textStyle.semibold16,
        color: colors.black,
        marginBottom: 10,
    },
    label: {
        ...textStyle.medium12,
        color: colors.gray1,
        marginTop: 8,
        paddingVertical: 5,
    },
    value: {
        ...textStyle.medium13,
        color: colors.black,
        borderBottomWidth: 1,
        borderBottomColor: colors.offWhite5,
        paddingVertical: 5,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default ExperienceDetailsModal;
