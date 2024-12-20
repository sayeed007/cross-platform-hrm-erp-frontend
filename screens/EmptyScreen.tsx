import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';

const rnd = (max = 256) =>
    Math.random() * max;

const generateColor = () =>
    `rgb(${rnd()},${rnd()},${rnd()})`;

export const EmptyScreen: React.FC = () => {

    const colors = useMemo(() => [...new Array(20)].map(() => generateColor()), []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
                data={colors}
                renderItem={({ item: color }) => (
                    <View
                        style={[styles.item, {
                            backgroundColor: color
                        }]}
                    />
                )}
                keyExtractor={(item, idx) => `item_${idx}`}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    item: {
        margin: 10,
        height: 90,
        borderRadius: 10
    }
});