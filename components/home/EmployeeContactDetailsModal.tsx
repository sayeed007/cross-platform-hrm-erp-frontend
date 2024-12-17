import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
    Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/Feather'; // Icons library
import { DirectoryEmployeeOption } from '../../typeInterfaces/DirectoryEmployee';

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
            alert('Copied to clipboard!');
        } else {
            // Use expo-clipboard for Native
            await Clipboard.setStringAsync(text);
            alert('Copied to clipboard!');
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
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            {/* Employee Card */}
                            <View style={styles.employeeCard}>
                                {employee?.profileShowImage}
                                <View style={styles.employeeInfo}>
                                    <Text style={styles.employeeName}>{employee.label}</Text>
                                    <Text style={styles.employeeRole}>{employee.designation}</Text>
                                </View>
                                <Text style={styles.department}>{employee.department}</Text>
                            </View>

                            {/* Phone */}
                            <View style={styles.contactRow}>
                                <Icon name="phone" size={20} color="#111827" style={styles.icon} />
                                <Text style={styles.contactText}>
                                    {employee.phone || 'N/A'}
                                </Text>
                                <View style={styles.iconActions}>
                                    {/* Dialer Icon */}
                                    <TouchableOpacity
                                        onPress={() => openPhoneDialer(employee.phone || '')}
                                    >
                                        <Icon name="phone-call" size={20} color="#34D399" />
                                    </TouchableOpacity>
                                    {/* Copy Icon */}
                                    <TouchableOpacity
                                        onPress={() => handleCopy(employee.phone || '', 'phone')}
                                    >
                                        <Icon
                                            name={copiedField === 'phone' ? 'check' : 'copy'}
                                            size={20}
                                            color={copiedField === 'phone' ? '#22C55E' : '#2563EB'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Email */}
                            <View style={styles.contactRow}>
                                <Icon name="mail" size={20} color="#111827" style={styles.icon} />
                                <Text style={styles.contactText}>
                                    {employee.email || 'N/A'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleCopy(employee.email || '', 'email')}
                                >
                                    <Icon
                                        name={copiedField === 'email' ? 'check' : 'copy'}
                                        size={20}
                                        color={copiedField === 'email' ? '#22C55E' : '#2563EB'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
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
        borderColor: '#C4CDD5',
        paddingBottom: 8,
    },
    employeeInfo: {
        flex: 1,
        marginLeft: 10
    },
    employeeName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    employeeRole: {
        fontSize: 12,
        color: '#6B7280'
    },
    department: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
        backgroundColor: '#E0F2FE',
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
        fontSize: 14,
        color: '#111827',
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
