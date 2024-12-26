import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';

interface SelectTimeProps {
    selectedTime: string; // The time to be selected initially
    onTimeChange: (time: string) => void; // Callback when a time is selected
}

const SelectTime: React.FC<SelectTimeProps> = ({ selectedTime, onTimeChange }) => {
    // Generate the list of times
    const timeOptions = useMemo(() => {
        const times = [];
        const startOfDay = moment().startOf('day'); // Start at 12:00 AM

        for (let i = 0; i < 1440; i++) { // 1440 minutes in a day
            times.push({
                label: startOfDay.clone().add(i, 'minutes').format('hh:mm A'), // Format: 12:00 AM, 12:01 AM, etc.
                value: startOfDay.clone().add(i, 'minutes').format('HH:mm'), // Value: 24-hour time format (e.g., 00:00)
            });
        }

        return times;
    }, []);

    console.log(selectedTime, timeOptions);

    return (
        <FlatList
            data={timeOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => onTimeChange(item.value)}
                    style={[
                        styles.modalOption,
                        selectedTime === item.value && styles.activeOption,
                    ]}
                >
                    <Text
                        style={[
                            styles.modalOptionText,
                            selectedTime === item.value && styles.activeFilterText,
                        ]}
                    >
                        {item.label}
                    </Text>
                </Pressable>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            initialNumToRender={12} // Render 12 items initially
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

export default SelectTime;
