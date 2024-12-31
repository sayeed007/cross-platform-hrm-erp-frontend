import React, { useMemo, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';
import { timeOptionsGenerator } from '../../../utils/timeOptions';

interface SelectTimeProps {
    selectedTime: string; // The time to be selected initially
    onTimeChange: (time: string) => void; // Callback when a time is selected
}

const ROW_HEIGHT = 45; // Approximate height of each row
const timeOptions = timeOptionsGenerator();

const SelectInTime: React.FC<SelectTimeProps> = ({ selectedTime, onTimeChange }) => {

    const flatListRefInTime = useRef<FlatList>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Update the selected index when `selectedTime` changes
    useEffect(() => {
        const index = timeOptions.findIndex((time) => time.value === selectedTime);
        setSelectedIndex(index);

        // Scroll to the selected index
        if (flatListRefInTime.current && index >= 0) {
            flatListRefInTime.current.scrollToIndex({
                index,
                animated: true, // Smooth scrolling
            });
        }
    }, [selectedTime]);

    return (
        <>

            {/* SELECTED DETAILS  */}
            <View style={styles?.headerContainer}>
                <Text style={styles?.dateDetails}>
                    {moment().format('ddd, MMMM YY')}
                </Text>

                <TouchableOpacity onPress={() => onTimeChange(selectedTime)}>
                    <Text style={styles?.skip}>
                        Skip
                    </Text>
                </TouchableOpacity>


            </View>

            <FlatList
                ref={flatListRefInTime}
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
                initialNumToRender={20} // Render 20 items initially
                getItemLayout={(data, index) => ({
                    length: ROW_HEIGHT,
                    offset: ROW_HEIGHT * index,
                    index,
                })}
                initialScrollIndex={selectedIndex}
                ItemSeparatorComponent={() => <View style={styles.separator} />} // Line separator
            />
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    dateDetails: {
        ...textStyle.semibold16,
        color: colors.gray2
    },
    skip: {
        ...textStyle.semibold16,
        color: colors.info
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

export default SelectInTime;
