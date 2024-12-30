import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { textStyle } from "./textStyle";

export const getStatusStyle = (status: number) => {
    switch (status) {
        case 0:
            return styles?.pending; // Pending status
        case 1:
            return styles?.success; // Success/Approved status
        case 2:
            return styles?.reject; // Rejected status
        default:
            return {}; // Optional: Default fallback style
    }
};



export const getLeaveStatusText = (status: number) => {
    switch (status) {
        case 0:
            return 'Pending'; // Pending status
        case 1:
            return 'Approved'; // Success/Approved status
        case 2:
            return 'Rejected'; // Rejected status
        default:
            return ''; // Optional: Default fallback text
    }
};

export const generateLeaveType = (title: string) => {
    return `${title?.charAt(0)?.toUpperCase()}${title?.slice(1)?.toLowerCase()} Leave`;
};


const styles = StyleSheet.create({
    pending: {
        color: colors?.warning,
        backgroundColor: colors?.warningBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    },
    success: {
        color: colors?.success,
        backgroundColor: colors?.successBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    },
    reject: {
        color: colors?.error,
        backgroundColor: colors?.errorBG,
        padding: 6,
        borderRadius: 4,
        ...textStyle?.medium12,
    }
});