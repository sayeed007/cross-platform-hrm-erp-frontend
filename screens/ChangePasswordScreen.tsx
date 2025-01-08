import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';


type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const ChangePasswordScreen = () => {

    const { user } = useUser();
    const navigation = useNavigation<NavigationProp>();


    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <GenerateAndViewIcon
                            iconName="ArrowLeft"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>Notice</Text>
                    <View />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    header: {
        paddingVertical: 15,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    navTitle: {
        ...textStyle?.bold16,
        color: colors?.white,
    },
    monthTabs: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    monthTab: {
        marginHorizontal: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    activeMonthTab: {
        borderWidth: 1,
        borderColor: colors?.white,
        borderRadius: 16,
    },
    monthTabText: {
        ...textStyle?.semibold14,
        color: colors?.white,
    },
    noticeContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    sectionTitle: {
        ...textStyle?.bold16,
        color: colors?.gray4,
        marginBottom: 12,
    },
    noNotices: {
        textAlign: 'center',
        ...textStyle?.regular14,
        color: colors?.gray3,
        marginVertical: 10,
    },
});

export default ChangePasswordScreen;