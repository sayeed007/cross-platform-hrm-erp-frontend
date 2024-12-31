import { NavigationProp } from '@react-navigation/native';
import { colors } from './colors';

export const setTabBarVisibility = (
    navigation: NavigationProp<any>,
    isVisible: boolean
) => {
    navigation.getParent()?.setOptions({
        tabBarStyle: {
            display: isVisible ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: colors?.white,
            height: 60,
            borderColor: colors?.offWhite1,
            borderTopWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
        },
    });
};
