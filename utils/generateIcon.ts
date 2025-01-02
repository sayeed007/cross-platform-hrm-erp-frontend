import { Image } from "react-native";

// Utility function to get local assets based on icon name
export const getIcon = (iconName: string): any => {
    const iconMap: { [key: string]: any } = {
        "calendar": require("../assets/icons/calendar.png"),
        "attendanceRequestApproval": require("../assets/icons/leaveRequestApproval.png"),
         "myLeaveRequest": require("../assets/icons/myLeaveRequest.png"),
         "leaveRequestApproval": require("../assets/icons/leaveRequestApproval.png"),
        "directory": require("../assets/icons/directory.png"),
        "holidays": require("../assets/icons/holidays.png"),
        "notices": require("../assets/icons/notices.png"),
        "officePolicy": require("../assets/icons/officePolicy.png"),
        "profile": require("../assets/icons/profile.png"),
        "changePassword": require("../assets/icons/changePassword.png"),
        "logOut": require("../assets/icons/logOut.png"),
    };

    return iconMap[iconName] || null; // Return the mapped icon or null if not found
};




