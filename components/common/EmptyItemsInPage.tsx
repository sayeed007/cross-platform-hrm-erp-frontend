import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

type EmptyItemsInPageProps = {
    message?: string;
};

export const EmptyItemsInPage: React.FC<EmptyItemsInPageProps> = ({
    message = 'Noting to show',
}) => {
    return (
        <View style={styles.noItemBox}>
            <Text style={styles.noItemText}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noItemBox: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    noItemText: {
        color: colors?.gray2,
        ...textStyle?.medium16,
    },
});
