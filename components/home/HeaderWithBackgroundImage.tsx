import React from 'react'
import { Image, Platform, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { BASE_URL } from '../../Server'
import { useUser } from '../../context/UserContext'
import { Ionicons } from '@expo/vector-icons';
import { getGreeting } from '../../utils/getGreeting'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../typeInterfaces/navigationTypes'
import { useNavigation } from '@react-navigation/native'
import { useSubscription } from '../../context/SubscriptionContext'
import { colors } from '../../utils/colors'
import { textStyle } from '../../utils/textStyle'

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


interface HeaderWithBackgroundImageProps {
    showGreeting?: boolean; // Optional prop to control greeting visibility
    navTitle: string; // Navigation title
}

const HeaderWithBackgroundImage: React.FC<HeaderWithBackgroundImageProps> = ({
    showGreeting = true, // Default value is true
    navTitle,
}) => {
    const { user, setUser } = useUser();
    const { unreadCount } = useSubscription();
    const navigation = useNavigation<NavigationProp>();

    const handleNotificationPress = () => {
        navigation.navigate('Notification');
    };

    return (
        <>
            <ImageBackground
                source={require('../../assets/images/HomeScreenBackground.png')} // Replace with the correct path to the image
                style={styles.backgroundImage}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.userImageWithNav}>
                        <Image
                            source={{
                                uri: `${BASE_URL?.baseApi}/${user?.profilePicPath}`
                            }}
                            style={styles.userImage}
                        />
                        <Text style={styles.routeName}>
                            {navTitle}
                        </Text>
                    </View>

                    <View style={styles.userImageWithNav}>

                        <TouchableOpacity onPress={() => setUser(null)}>
                            <Text>Log Out</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.notificationIcon} onPress={handleNotificationPress}>
                            <Ionicons name="notifications-outline" size={28} color={colors?.white} />
                            {(unreadCount > 0) && <View style={styles.redDot} />}
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Greeting Section */}
                {showGreeting &&
                    <View style={styles.greetingSection}>
                        <Text style={styles.greetingText}>
                            {getGreeting()}
                        </Text>
                        <Text style={styles.userName}>
                            {user?.firstName} {user?.lastName}
                        </Text>
                    </View>
                }

            </ImageBackground>
        </>

    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 250,
        resizeMode: 'cover',
        padding: 16,
        paddingBottom: 90,
        marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    userImageWithNav: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors?.white
    },
    routeName: {
        color: colors?.white,
        marginLeft: 10,
        ...textStyle?.bold18,
    },
    notificationIcon: {
        position: 'relative',
    },
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    greetingSection: {
        marginBottom: 16,
    },
    greetingText: {
        ...textStyle?.regular20,
        color: colors?.white,
    },
    userName: {
        color: colors?.white,
        ...textStyle?.bold24,
    },

})

export default HeaderWithBackgroundImage
