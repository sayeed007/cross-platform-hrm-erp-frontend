import { NavigationProp } from '@react-navigation/native';

export const setTabBarVisibility = (
    navigation: NavigationProp<any>,
    isVisible: boolean
) => {
    navigation.getParent()?.setOptions({
        tabBarStyle: {
            display: isVisible ? 'flex' : 'none',
        },
    });
};
