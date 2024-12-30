import React, { useMemo } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

interface YearSelectorModalProps {
    isVisible: boolean;
    onClose: () => void;
    selectedYear: string; // Example: "2024"
    onYearChange: (year: string) => void;
}

const YearSelectorModal: React.FC<YearSelectorModalProps> = ({
    isVisible,
    onClose,
    selectedYear,
    onYearChange,
}) => {
    // Generate a list of years from the last 10 years to the next 2 years
    const yearsList = useMemo(() => {
        const startYear = moment().year() - 10;
        const endYear = moment().year() + 2;
        const years = [];

        for (let year = endYear; year >= startYear; year--) {
            years.push(year.toString()); // Convert year to string
        }

        return years;
    }, []);

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
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name="arrow-left" size={24} color={colors.gray1} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Select Year</Text>
                            <View />
                        </View>

                        {/* Year List */}
                        <FlatList
                            data={yearsList}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => onYearChange(item)}
                                    style={[
                                        styles.modalOption,
                                        selectedYear === item && styles.activeOption,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.modalOptionText,
                                            selectedYear === item && styles.activeFilterText,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                            initialNumToRender={6} // Render 6 years initially
                            getItemLayout={(data, index) => ({
                                length: 48, // Approx height of each row
                                offset: 48 * index,
                                index,
                            })}
                        />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: '50%', // Limit modal height to show 6 items
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerTitle: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    modalOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    activeOption: {
        backgroundColor: colors.bottomNav, // Highlight selected option
    },
    modalOptionText: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    activeFilterText: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default YearSelectorModal;
