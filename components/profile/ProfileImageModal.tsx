import React from 'react';
import {
    Modal,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import shadowStyles from '../../utils/shadowStyles';

interface ProfileImageModalProps {
    isVisible: boolean;
    onClose: () => void;
    onTakePicture: () => void;
    onChooseFromGallery: () => void;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
    isVisible,
    onClose,
    onTakePicture,
    onChooseFromGallery,
}) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOuterContainer}
                onPress={onClose} // Close modal on outside touch
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <View style={styles.modalContent}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name="arrow-left" size={24} color={colors.gray1} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Update Profile Picture</Text>
                            <View />
                        </View>

                        {/* Options */}
                        <TouchableOpacity style={styles.option} onPress={onTakePicture}>
                            <View style={styles.iconContainer}>
                                <Icon name="camera" size={20} color={colors.blue} />
                            </View>
                            <Text style={styles.optionText}>Take Picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={onChooseFromGallery}>
                            <View style={styles.iconContainer}>
                                <Icon name="image" size={20} color={colors.blue} />
                            </View>
                            <Text style={styles.optionText}>Choose from gallery</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        backgroundColor: colors.modalBG,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    modalContent: {
        paddingVertical: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    headerTitle: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderRadius: 12,
        ...shadowStyles.popUpShadow2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.offWhite1,
        borderRadius: 20,
        marginRight: 12,
    },
    optionText: {
        ...textStyle.medium14,
        color: colors.black,
    },
});

export default ProfileImageModal;
