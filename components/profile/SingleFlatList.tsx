import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { colors } from '../../utils/colors';
import ProfileIndividualDetails from './ProfileIndividualDetails';
import { textStyle } from '../../utils/textStyle';

export interface FlatListNormalData {
    title: string;
    value: string | number | boolean | null;
};

interface SingleFlatListProps {
    flatListNormalData: FlatListNormalData[];
    listTitle?: string; // Add a title prop for the list
}

const SingleFlatList: React.FC<SingleFlatListProps> = ({ flatListNormalData, listTitle }) => {

    return (
        <View style={styles.container}>
            {/* List Title */}
            {listTitle &&
                <Text style={styles.title}>{listTitle}</Text>
            }

            {/* FlatList */}
            <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                key={listTitle}
                data={flatListNormalData}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                renderItem={({ item, index }) => (
                    <ProfileIndividualDetails
                        title={item.title}
                        value={item.value}
                        index={`${item.title}-${index}`}
                    />
                )}
                style={{ flex: 1 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 6,
        marginHorizontal: 16,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        ...textStyle.semibold20,
        color: colors.black,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default SingleFlatList;
