import { Image } from "react-native";

// Utility function to get local assets based on icon name
export const getIcon = (iconName: string): any => {
    const iconMap: { [key: string]: any } = {
        "calendar": require("../assets/icons/calendar.png"),
        "attendanceRequestApproval": require("../assets/icons/attendanceRequestApproval.png"),
        // "log-out": require("../../assets/icons/log-out.png"),
        // "document-text": require("../../assets/icons/document-text.png"),
        // folder: require("../../assets/icons/folder.png"),
        // sunny: require("../../assets/icons/sunny.png"),
        // megaphone: require("../../assets/icons/megaphone.png"),
        // person: require("../../assets/icons/person.png"),
        // "lock-closed": require("../../assets/icons/lock-closed.png"),
        // "exit-outline": require("../../assets/icons/exit-outline.png"),
    };

    return iconMap[iconName] || null; // Return the mapped icon or null if not found
};




