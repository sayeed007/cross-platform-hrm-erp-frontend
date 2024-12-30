import React, { useState } from 'react';
import {
    Modal,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import shadowStyles from '../../utils/shadowStyles';
import { LinearGradient } from 'expo-linear-gradient';

interface EditNameModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (firstName: string, lastName: string) => void;
    currentFirstName: string;
    currentLastName: string;
}

const EditNameModal: React.FC<EditNameModalProps> = ({
    isVisible,
    onClose,
    onSave,
    currentFirstName,
    currentLastName,
}) => {
    const [firstName, setFirstName] = useState(currentFirstName);
    const [lastName, setLastName] = useState(currentLastName);

    const handleSave = () => {
        onSave(firstName, lastName);
        onClose();
    };

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
                            <Text style={styles.headerTitle}>Edit Name</Text>
                            <View />
                        </View>

                        {/* Warning Section */}
                        <View style={styles.warningContainer}>
                            <AntDesign name="warning" size={24} color={colors.red} />
                            <Text style={styles.warningText}>
                                This name change will affect everywhere throughout the system.
                            </Text>
                        </View>

                        {/* Inputs */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.button}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </LinearGradient>
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
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.warningBG,
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    warningText: {
        ...textStyle.medium14,
        color: colors.red,
        marginLeft: 10,
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: colors.offWhite1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray2,
        padding: 12,
        marginBottom: 10,
        ...textStyle.regular14,
        color: colors.black,
    },
    saveButton: {
        // backgroundColor: colors.blue,
        // borderRadius: 8,
        // paddingVertical: 14,
        // alignItems: 'center',
        // ...shadowStyles.popUpShadow2,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    saveButtonText: {
        ...textStyle.semibold16,
        color: colors.white,
    },
});

export default EditNameModal;
