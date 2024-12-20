import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

type EmptyItemsProps = {
    title?: string;
    subtitle?: string;
};

export const EmptyItems: React.FC<EmptyItemsProps> = ({
    title = 'Noting to show',
    subtitle = 'Content will appear once something is created or modified.',
}) => {
    return (
        <View style={styles.emptyState}>
            <Image source={require('../../assets/images/EmptyBox.png')} style={styles.emptyImage} />
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptySubtitle}>{subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: colors?.gray4,
    },
    emptySubtitle: {
        fontSize: 14,
        color: colors?.gray2,
        textAlign: 'center',
    },
});
