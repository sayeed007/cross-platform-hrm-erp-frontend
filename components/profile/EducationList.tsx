import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useUser } from "../../context/UserContext";
import { Education } from "../../typeInterfaces/User";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import EducationDetailsModal from "./EducationDetailsModal";
import { EmptyItemsInPage } from "../common/EmptyItemsInPage";

const EducationList = () => {

    const { user } = useUser();
    const { education: educationData } = user?.employeeInfo || {};

    const [selectedEducation, setSelectedEducation] = useState<Education | undefined>();
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = (education: Education) => {
        setSelectedEducation(education);
        setModalVisible(true);
    };

    return (
        <>
            {selectedEducation && (
                <EducationDetailsModal
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    education={selectedEducation}
                />
            )}

            <View style={styles.container}>
                <Text style={styles.title}>Education</Text>

                {/* LIST OF EDUCATION */}
                {(educationData || [])?.length > 0 ?
                    <FlatList
                        scrollEnabled={false}
                        data={educationData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.educationItem}
                                onPress={() => openModal(item)}
                            >
                                <View>
                                    <Text style={styles.institutionName}>
                                        {item?.institute ? item?.institute : 'N/A'}
                                    </Text>
                                    <Text style={styles.degree}>
                                        {item?.degree ? item.degree : 'N/A'}-{item?.major ? item?.major : 'N/A'}
                                    </Text>
                                    <Text style={styles.duration}>
                                        {item.passingYear
                                            ? item.passingYear
                                            : item?.expectedYearOfPassing
                                                ? item?.expectedYearOfPassing
                                                : 'N/A'
                                        }
                                    </Text>
                                </View>
                                <Icon name="chevron-right" size={20} color={colors.info} />
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                    :
                    <EmptyItemsInPage
                        message={'No experience has been added yet.'}
                    />
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 6,
        marginHorizontal: 16,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        ...textStyle.semibold20,
        color: colors.black,
        marginBottom: 10,
    },
    educationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    institutionName: {
        ...textStyle.bold14,
        color: colors.black,
    },
    degree: {
        ...textStyle.regular13,
        color: colors.gray2,
    },
    duration: {
        ...textStyle.regular13,
        color: colors.gray2,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default EducationList;
