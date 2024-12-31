import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabBg } from '../../svg/TabBg';
import { colors } from '../../utils/colors';
import Feather from '@expo/vector-icons/Feather';
import { textStyle } from '../../utils/textStyle';


type Props = BottomTabBarButtonProps;

export const TabBarAdvancedButton: React.FC<Props> = ({ ...props }) => (
    <View style={styles.rootContainer}>
        <View
            style={[styles.container, { pointerEvents: "box-none" }]}
        >
            <TabBg
                style={styles.background}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPress}
            >
                <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>

    </View>

);

const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        position: 'relative',
        width: 75,
        alignItems: 'center',
        backgroundColor: colors?.offWhite1,
    },
    background: {
        position: 'absolute',
        top: 0,
    },
    button: {
        top: -22.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 27,
        backgroundColor: colors?.info,
    },
    buttonIcon: {
        ...textStyle?.regular16,
        color: colors?.white
    }
});
