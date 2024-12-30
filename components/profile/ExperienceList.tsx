import moment from "moment";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUser } from "../../context/UserContext";
import { Experience } from "../../typeInterfaces/User";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import { EmptyItemsInPage } from "../common/EmptyItemsInPage";

const ExperienceList = () => {

    const { user } = useUser();
    const { experience: experienceData } = user?.employeeInfo || {};

    const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>();
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = (experience: Experience) => {
        setSelectedExperience(experience);
        setModalVisible(true);
    };

    return (
        <>
            {/* {selectedExperience && (
                <ExperienceDetailsModal
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    experience={selectedExperience}
                />
            )} */}

            <View style={styles.container}>
                <Text style={styles.title}>Experience</Text>

                {/* LIST OF Experience */}
                {(experienceData || [])?.length > 0 ?
                    <FlatList
                        scrollEnabled={false}
                        data={experienceData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <>
                                {/* <TouchableOpacity
                                style={styles.experienceItem}
                                onPress={() => openModal(item)}
                            > */}
                                <View>
                                    <Text style={styles.institutionName}>
                                        {item?.designation ? item?.designation : 'N/A'}
                                    </Text>
                                    <Text style={styles.degree}>
                                        {item?.company ? item.company : 'N/A'} | {item?.employmentType ? capitalizeFirstLetter(item?.employmentType) : 'N/A'}
                                    </Text>
                                    <Text style={styles.duration}>
                                        {moment(item.startDate, 'YYYY-MM-DD').format('MMM, YYYY')} - {moment(item.endDate, 'YYYY-MM-DD').format('MMM, YYYY')}
                                    </Text>
                                </View>
                                {/* <Icon name="chevron-right" size={20} color={colors.info} /> */}
                                {/* </TouchableOpacity> */}
                            </>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                    :
                    <EmptyItemsInPage
                        message={'No experience has been added yet.'}
                    />
                }

            </View >
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
    experienceItem: {
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

export default ExperienceList;
