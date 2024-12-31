import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';

type RequestFilter = {
    key: string;
    label: string;
};

interface RequestStatusFIlterModalProps {
    isVisible: boolean;
    onClose: () => void;
    requestStatus: RequestFilter[];
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
}

const RequestStatusFIlterModal: React.FC<RequestStatusFIlterModalProps> = ({
    isVisible,
    onClose,
    requestStatus,
    selectedFilter,
    onFilterChange,
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
                onPress={onClose} // Close the modal when pressed outside
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <View style={styles.modalContent}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name="arrow-left" size={24} color={colors.gray1} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Show Request</Text>
                            <View />
                        </View>

                        {requestStatus?.map((leave, index) => (
                            <Pressable
                                key={leave?.key}
                                onPress={() => onFilterChange(leave?.key)}
                                style={[
                                    styles.modalOption,
                                    index === requestStatus.length - 1 && styles.lastOption, // Apply conditional styling
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.modalOptionText,
                                        selectedFilter === leave?.key && styles?.activeFilter,
                                    ]}
                                >
                                    {leave?.label}
                                </Text>
                            </Pressable>
                        ))}
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
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    headerTitle: {
        ...textStyle.medium14,
        color: colors.gray1,
    },
    modalOption: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.offWhite5,
    },
    lastOption: {
        borderBottomWidth: 0,
    },
    modalOptionText: {
        ...textStyle.medium13,
        color: colors.gray1,
    },
    activeFilter: {
        ...textStyle.bold13,
        color: colors.black,
    },
});

export default RequestStatusFIlterModal;
