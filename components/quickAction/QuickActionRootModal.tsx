import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';

interface QuickActionRootModalProps {
    isVisible: boolean;
    onClose: () => void;
    onApplyAttendance: () => void;
    onApplyLeave: () => void;
}

const QuickActionRootModal: React.FC<QuickActionRootModalProps> = ({
    isVisible,
    onClose,
    onApplyAttendance,
    onApplyLeave,
}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>

                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={onApplyAttendance}
                        >
                            <Icon name="calendar" size={20} color={colors.green} />
                            <Text style={styles?.titleText}>
                                Apply Attendance
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.itemContainer, styles.borderTop]}
                            onPress={onApplyLeave}
                        >
                            <Icon name="file-text" size={20} color={colors.orange} />
                            <Text style={styles?.titleText}>
                                Apply Leave
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color={colors?.black} />
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.modalBG,
        position: 'relative',
        alignItems: 'center',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 28,
        width: '80%',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors?.white,
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    itemContainer: {
        padding: 20,
        flexDirection: 'row',
        width: '100%',
    },
    titleText: {
        ...textStyle.bold14,
        color: colors.black,
        marginLeft: 15,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: colors?.white,
        height: 56,
        width: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderTop: {
        borderTopColor: colors.offWhite5,
        borderTopWidth: 1,
    }
});

export default QuickActionRootModal;
