import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { BASE_URL } from '../../Server';

interface EmployeeAvatarProps {
    profileShowImage?: string; // URL of the profile image
    label: string; // Employee name or label (used for initials)
    size?: number; // Size of the avatar (default is 40)
}


const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
    profileShowImage,
    label,
    size = 40, // Default avatar size
}) => {
    return (
        <>
            {profileShowImage ? (
                <Image
                    style={[styles.avatar, { width: size, height: size }]}
                    source={{ uri: `${BASE_URL.baseApi}/${profileShowImage}` }}
                    alt="Employee Avatar"
                />
            ) : (
                <Avatar
                    size={size} // Dynamically set size
                    rounded
                    title={label.charAt(0).toUpperCase()} // Get the first character of the label
                    overlayContainerStyle={{
                        backgroundColor: colors.gray3, // Background color
                    }}
                    titleStyle={{
                        color: colors.white,
                        fontWeight: 'bold',
                        fontSize: size / 2, // Adjust font size based on avatar size
                    }}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    avatar: {
        // borderRadius: 40 / 2, // Half of the default size for a circular image
        borderRadius: '50%',
    },
});

export default EmployeeAvatar;
