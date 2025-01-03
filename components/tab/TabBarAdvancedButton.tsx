import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabBg } from '../../svg/TabBg';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { GenerateAndViewIcon } from '../common/GenerateAndSHowIcon';


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
                <GenerateAndViewIcon
                    iconName="Plus"
                    size={24}
                />
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
