import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import HeaderWithBackgroundImage from '../components/home/HeaderWithBackgroundImage'
import MenuList from '../components/menu/MenuList'
import { HomeScreenNavigationProp } from '../typeInterfaces/navigationTypes'
import { colors } from '../utils/colors'
import { setTabBarVisibility } from '../utils/navigationUtils'

const MenuScreen = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    useLayoutEffect(() => {
        setTabBarVisibility(navigation, true); // Ensure tab bar is visible on home
    }, [navigation]);


    return (
        <>
            {/* PAGE CONTENT */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                {/* HEADER - NOTIFICATION - GREETINGS */}
                <HeaderWithBackgroundImage
                    showGreeting={false}
                    navTitle='Menu List'
                />

                <View style={styles?.container}>
                    {/* Menu List */}
                    <MenuList />
                </View>

            </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: '4%',
        position: 'relative',
    },
});

export default MenuScreen
