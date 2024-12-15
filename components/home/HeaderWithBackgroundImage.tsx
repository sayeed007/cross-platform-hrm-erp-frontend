import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { BASE_URL } from '../../Server'
import { useUser } from '../../context/UserContext'
import { Ionicons } from '@expo/vector-icons';
import { getGreeting } from '../../utils/getGreeting'

const HeaderWithBackgroundImage = () => {
    const hasNotification = true; // Example flag for notification presence
    const { user, setUser } = useUser();


    return (
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
                    <Text style={styles.routeName}>Home</Text>
                </View>

                <View style={styles.userImageWithNav}>

                    <TouchableOpacity onPress={() => setUser(null)}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.notificationIcon}>
                        <Ionicons name="notifications-outline" size={28} color="#FFFFFF" />
                        {hasNotification && <View style={styles.redDot} />}
                    </TouchableOpacity>
                </View>

            </View>

            {/* Greeting Section */}
            <View style={styles.greetingSection}>
                <Text style={styles.greetingText}>
                    {getGreeting()}
                </Text>
                <Text style={styles.userName}>
                    {user?.firstName} {user?.lastName}
                </Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 300,
        flex: 1,
        resizeMode: 'cover',
        marginTop: 24,
        padding: 16,
        paddingBottom: 90,
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
        borderColor: '#FFFFFF'
    },
    routeName: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 10,
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
        fontSize: 20,
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

})

export default HeaderWithBackgroundImage
