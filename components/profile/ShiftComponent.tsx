import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import moment from 'moment';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import SingleFlatList, { FlatListNormalData } from './SingleFlatList';
import ProfileIndividualDetails from './ProfileIndividualDetails';
import { RoasterInfo, ShiftInfo } from '../../typeInterfaces/User';





// Dummy Tooltip Component
// const Tooltip = ({ content, children }) => {
//     return (
//         <View>
//             {children}
//             {/* Add your tooltip logic here */}
//         </View>
//     );
// };

// const ShiftComponent = ({ roasterInfo, flatListNormalData }) => {
interface ShiftComponentProps {
    roasterInfo: RoasterInfo; // Add a title prop for the list
    flatListNormalData: FlatListNormalData;
}

const ShiftComponent: React.FC<ShiftComponentProps> = ({ roasterInfo, flatListNormalData = [{ title: '', value: '' }] }) => {

    const backgroundArr = [
        '#FFE7C2', '#EDFFD0', '#E5D0FF', '#FFC2E5', '#D0FFE5',
        '#C2E5FF', '#FACBEA', '#FFD0ED', '#E5FFC2', '#C2FFED',
    ];

    const generateContent = (item: ShiftInfo) => (
        <View style={styles.tooltipContent}>
            <Text>Start Time: {moment(item?.shiftStartTime, 'HH:mm:ss').format('hh:mm A')}</Text>
            <Text>Late Time: {moment(item?.shiftLateTime, 'HH:mm:ss').format('hh:mm A')}</Text>
            <Text>End Time: {moment(item?.shiftEndTime, 'HH:mm:ss').format('hh:mm A')}</Text>
        </View>
    );

    const generateBackground = (shiftId: number) => {
        const colorIndex = shiftId % backgroundArr.length;
        return backgroundArr[colorIndex];
    };

    console.log(flatListNormalData, 'flatListNormalData');

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.title}>Shift Attendance Roster Info</Text>

                <ScrollView
                    horizontal
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                >

                    <View style={styles.shapeRootDiv}>

                        <View style={styles.shapeDiv}>
                            {roasterInfo?.shiftTimeInformations?.map((item, index) => (
                                // <Tooltip content={generateContent(item)} key={`shifts-${index}`}>
                                <View
                                    key={item?.shiftName}
                                    style={[
                                        index === 0 ? styles.shapeOne : styles.shapeTwo,
                                        { backgroundColor: generateBackground(item?.id) },
                                    ]}
                                >
                                    {index === 0 && (
                                        <View
                                            style={[
                                                styles.shapeOneBefore,
                                                { borderLeftColor: generateBackground(item?.id) },
                                            ]}
                                        />
                                    )}

                                    <Text style={styles.shiftName}>
                                        {item?.shiftName}
                                    </Text>


                                    {index !== 0 && (
                                        <View
                                            style={[
                                                styles.shapeTwoBefore,
                                                { borderLeftColor: generateBackground(item?.id) },
                                            ]}
                                        />
                                    )}
                                </View>
                                // </Tooltip>
                            ))}
                        </View>

                        {/*  */}
                        <View style={styles.legendDiv}>
                            <Text style={styles.legendText}>Rotate to</Text>
                        </View>

                    </View>
                </ScrollView>


                {/* FlatList */}
                <FlatList
                    key={'Shift Attendance Roster Info'}
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
        </>

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
    shapeRootDiv: {
        flex: 1,
        position: 'relative',
        borderRadius: '8px',
        height: 60,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.gray3,
        borderStyle: 'dashed',
    },
    shapeDiv: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        position: 'relative',
    },
    shapeOne: {
        height: 40,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        position: 'relative',
        marginHorizontal: 5,
    },
    shapeOneBefore: {
        position: 'absolute',
        right: -20,
        bottom: 0,
        width: 0,
        height: 0,
        borderTopWidth: 20,
        borderBottomWidth: 20,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    shapeTwo: {
        height: 40,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginHorizontal: 5,
    },
    shapeTwoBefore: {
        position: 'absolute',
        right: -20,
        bottom: 0,
        width: 0,
        height: 0,
        borderTopWidth: 20,
        borderBottomWidth: 20,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    shiftName: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '500',
    },
    legendDiv: {
        position: 'absolute',
        bottom: -20,
        left: '50%',
        transform: [{ translateX: -50 }],
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#BDBDBD',
    },
    legendText: {
        color: '#6A6D76',
        fontSize: 12,
        fontWeight: '500',
    },
    tooltipContent: {
        flexDirection: 'column',
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default ShiftComponent;
