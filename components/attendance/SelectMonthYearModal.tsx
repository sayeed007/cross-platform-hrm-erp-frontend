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

interface MonthYearModalProps {
    isVisible: boolean;
    onClose: () => void;
    selectedMonth: string; // Example: "July 2024"
    onMonthChange: (month: string) => void;
}

const SelectMonthYearModal: React.FC<MonthYearModalProps> = ({
    isVisible,
    onClose,
    selectedMonth,
    onMonthChange,
}) => {

    // Generate months from the last two years to next month
    const monthsList = useMemo(() => {
        const startDate = moment().subtract(2, 'years').startOf('month');
        const endDate = moment().add(2, 'month').startOf('month');
        const months = [];

        while (startDate.isBefore(endDate)) {
            months.push(startDate.format('MMMM, YYYY')); // e.g., "July, 2024"
            startDate.add(1, 'month');
        }

        return months.reverse(); // Reverse to show the latest first
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

                        {/* Month List */}
                        <FlatList
                            data={monthsList}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => onMonthChange(item)}
                                    style={[
                                        styles.modalOption,
                                        selectedMonth === item && styles.activeOption,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.modalOptionText,
                                            selectedMonth === item && styles.activeFilterText,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                            initialNumToRender={6} // Render 6 months initially
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
        backgroundColor: colors.modalBG,
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

export default SelectMonthYearModal;
