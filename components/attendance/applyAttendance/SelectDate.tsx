import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';

interface selectDateProps {
    selectedDate: string; // The date to be selected initially
    onDateChange: (date: string) => void; // Callback when a date is selected
}

const SelectDate: React.FC<selectDateProps> = ({ selectedDate, onDateChange }) => {

    // Generate the list of dates
    const dateOptions = useMemo(() => {
        const dates = [];
        const today = moment();
        const yesterday = moment().subtract(1, 'day');

        // Add "Today" and "Yesterday" options
        dates.push({ label: 'Today', value: today.format('YYYY-MM-DD') });
        dates.push({ label: 'Yesterday', value: yesterday.format('YYYY-MM-DD') });

        // Add the last 60 days
        for (let i = 2; i < 62; i++) {
            const date = today.clone().subtract(i, 'day');
            dates.push({
                label: date.format('ddd, MMMM DD'),
                value: date.format('YYYY-MM-DD'),
            });
        }

        return dates;
    }, []);

    return (
        <FlatList
            data={dateOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => onDateChange(item.value)}
                    style={[
                        styles.modalOption,
                        selectedDate === item.value && styles.activeOption,
                    ]}
                >
                    <Text
                        style={[
                            styles.modalOptionText,
                            selectedDate === item.value && styles.activeFilterText,
                        ]}
                    >
                        {item.label}
                    </Text>
                    {/* {item.label !== 'Today' && item.label !== 'Yesterday' && (
                        <Text style={styles.subText}>
                            {moment(item.value).format('ddd, MMMM DD')}
                        </Text>
                    )} */}
                </Pressable>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            initialNumToRender={6} // Render 6 items initially
            getItemLayout={(data, index) => ({
                length: 60, // Approximate height of each row
                offset: 60 * index,
                index,
            })}
            ItemSeparatorComponent={() => <View style={styles.separator} />} // Line separator
        />
    );
};

const styles = StyleSheet.create({
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
        textAlign: 'center',
    },
    activeFilterText: {
        ...textStyle.semibold16,
        color: colors.black,
    },
    listContent: {
        paddingBottom: 20,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5, // Light grey for the separator
    },
});

export default SelectDate;
