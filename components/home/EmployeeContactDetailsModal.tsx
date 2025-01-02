import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import {
    Linking,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather'; // Icons library
import { DirectoryEmployeeOption } from '../../typeInterfaces/DirectoryEmployee';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import EmployeeAvatar from '../common/EmployeeAvatar';

interface EmployeeContactDetailsModalProps {
    employee: DirectoryEmployeeOption | null;
    visible: boolean;
    onClose: () => void;
}

const EmployeeContactDetailsModal: React.FC<EmployeeContactDetailsModalProps> = ({
    employee,
    visible,
    onClose,
}) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = async (text: string, field: string) => {
        if (Platform.OS === 'web' && navigator.clipboard) {
            // Use the native Clipboard API on Web
            await navigator.clipboard.writeText(text);
            Toast.show({
                type: 'infoToast',
                position: 'bottom',
                text1: 'Copied to clipboard!',
            });
        } else {
            // Use expo-clipboard for Native
            await Clipboard.setStringAsync(text);
            Toast.show({
                type: 'infoToast',
                position: 'bottom',
                text1: 'Copied to clipboard!',
            });
        }

        setCopiedField(field);

        setTimeout(() => {
            setCopiedField(null); // Reset the icon state after 2 seconds
        }, 2000);
    };

    const openPhoneDialer = (phoneNumber: string) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    if (!employee) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity>
                        <View style={styles.modalContent}>
                            {/* Employee Card */}
                            <View style={styles.employeeCard}>
                                <EmployeeAvatar
                                    profileShowImage={employee?.profileShowImage ?? ''}
                                    label={`${employee.label.charAt(0)}`}
                                    size={40}
                                />

                                <View style={styles.employeeInfo}>
                                    <Text style={styles.employeeName}>{employee.label}</Text>
                                    <Text style={styles.employeeRole}>{employee.designation}</Text>
                                </View>
                                <Text style={styles.department}>{employee.department}</Text>
                            </View>

                            {/* Phone */}
                            <View style={styles.contactRow}>
                                <Icon name="phone" size={20} color={colors?.black} style={styles.icon} />
                                <Text style={styles.contactText}>
                                    {employee.phone || 'N/A'}
                                </Text>
                                <View style={styles.iconActions}>
                                    {/* Dialer Icon */}
                                    <TouchableOpacity
                                        onPress={() => openPhoneDialer(employee.phone || '')}
                                    >
                                        <Icon name="phone-call" size={20} color={colors?.green} />
                                    </TouchableOpacity>
                                    {/* Copy Icon */}
                                    <TouchableOpacity
                                        onPress={() => handleCopy(employee.phone || '', 'phone')}
                                    >
                                        <Icon
                                            name={copiedField === 'phone' ? 'check' : 'copy'}
                                            size={20}
                                            color={copiedField === 'phone' ? colors?.green : colors?.info}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Email */}
                            <View style={styles.contactRow}>
                                <Icon name="mail" size={20} color={colors?.black} style={styles.icon} />
                                <Text style={styles.contactText}>
                                    {employee.email || 'N/A'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleCopy(employee.email || '', 'email')}
                                >
                                    <Icon
                                        name={copiedField === 'email' ? 'check' : 'copy'}
                                        size={20}
                                        color={copiedField === 'email' ? colors?.green : colors?.info}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.modalBG,
    },
    modalContent: {
        backgroundColor: colors?.white,
        padding: 20,
        borderRadius: 8,
        width: '85%',
        elevation: 5,
    },
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: colors?.offWhite5,
        paddingBottom: 8,
    },
    employeeInfo: {
        flex: 1,
        marginLeft: 10
    },
    employeeName: {
        ...textStyle?.bold16,
    },
    employeeRole: {
        ...textStyle?.regular12,
        color: colors?.gray2
    },
    department: {
        ...textStyle?.semibold12,
        color: colors?.info,
        backgroundColor: colors?.infoBG,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    contactText: {
        ...textStyle?.regular14,
        color: colors?.black,
        flex: 1,
        marginLeft: 8
    },
    icon: {
        marginRight: 8
    },
    iconActions: {
        flexDirection: 'row',
        gap: 12,
    },
});

export default EmployeeContactDetailsModal;
