import React from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Education } from "../../typeInterfaces/User";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import ProfileIndividualDetails from "./ProfileIndividualDetails";

type EducationDetailsModalProps = {
    isVisible: boolean; // Whether the modal is visible
    onClose: () => void; // Callback function to close the modal
    education: Education; // The education object to display details
};

const EducationDetailsModal: React.FC<EducationDetailsModalProps> = ({ isVisible, onClose, education }) => {

    const educationDetailsData = [
        { 'title': 'Degree', value: education?.degree ? education?.degree : 'N/A' },
        { 'title': 'Passing Year', value: education?.passingYear ? education?.passingYear : 'N/A' },
        { 'title': 'Major', value: education?.major ? education?.major : 'N/A' },
        { 'title': 'Grade', value: education?.grade ? education?.grade : 'N/A' },
        { 'title': 'Result', value: education?.result ? education?.result : 'N/A' },
        { 'title': 'Level of Education', value: education?.levelOfEducation ? education?.levelOfEducation : 'N/A' },
        { 'title': 'Duration', value: education?.duration ? education?.duration : 'N/A' },
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
                        <Text style={styles.headerText}>Education Details</Text>
                        <View />
                    </View>

                    <Text style={styles.institution}>{education.institute}</Text>

                    {/* List */}
                    <ScrollView
                        // style={{ marginBottom: 70 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                    >
                        {/* FLAT-LIST */}
                        <FlatList
                            nestedScrollEnabled={true}
                            scrollEnabled={false}
                            key={'Education Details'}
                            data={educationDetailsData}
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
                    </ScrollView>
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

export default EducationDetailsModal;


