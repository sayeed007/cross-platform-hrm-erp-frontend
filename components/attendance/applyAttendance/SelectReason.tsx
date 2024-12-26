import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../utils/colors';
import { textStyle } from '../../../utils/textStyle';

interface SelectReasonProps {
    reason: string; // Currently selected reason
    onReasonSelect: (reason: string) => void; // Callback when a reason is selected
}

const reasons = [
    'Customer Visit',
    'Forgot to Punch',
    'Official Duty',
    'Work From Home',
    'Others',
];

const SelectReason: React.FC<SelectReasonProps> = ({ reason, onReasonSelect }) => {
    return (
        <>

            <FlatList
                data={reasons}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            styles.item,
                            pressed && styles.itemPressed,
                        ]}
                        onPress={() => onReasonSelect(item)}
                    >
                        <Text
                            style={[
                                styles.itemText,
                                item === reason && styles.selectedItemText, // Bold text for selected reason
                            ]}
                        >
                            {item}
                        </Text>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </>

    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 20,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    itemPressed: {
        backgroundColor: colors.offWhite3,
    },
    itemText: {
        ...textStyle.medium13,
        color: colors.gray1,
    },
    selectedItemText: {
        ...textStyle.bold13,
        color: colors.black,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default SelectReason;
