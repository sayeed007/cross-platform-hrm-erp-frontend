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
        "Home": require("../assets/icons/home.png"),
        "Home-Focused": require("../assets/icons/Home-Focused.png"),
        "Attendance": require("../assets/icons/Attendance.png"),
        "Attendance-Focused": require("../assets/icons/Attendance-Focused.png"),
        "Leave": require("../assets/icons/Leave.png"),
        "Leave-Focused": require("../assets/icons/Leave-Focused.png"),
        "Menu": require("../assets/icons/Menu.png"),
        "Menu-Focused": require("../assets/icons/Menu-Focused.png"),
        "reject": require("../assets/icons/reject.png"),
        "approve": require("../assets/icons/approve.png"),
        "ArrowLeft": require("../assets/icons/ArrowLeft.png"),
        "ArrowRight": require("../assets/icons/ArrowRight.png"),
        "ArrowLeftGray": require("../assets/icons/ArrowLeftGray.png"),
        "ArrowLeftBlack": require("../assets/icons/ArrowLeftBlack.png"),
        "triangleDown": require("../assets/icons/triangleDown.png"),
        "triangleUp": require("../assets/icons/triangleUp.png"),
        "PDF": require("../assets/icons/pdf.png"),
        "Warning": require("../assets/icons/Warning.png"),
        "WarningRed": require("../assets/icons/WarningRed.png"),
        "Bell": require("../assets/icons/Bell.png"),
        "ArrowUpRight": require("../assets/icons/ArrowUpRight.png"),
        "FolderNotchOpen": require("../assets/icons/FolderNotchOpen.png"),
        "longArrowRight": require("../assets/icons/longArrowRight.png"),
        "info": require("../assets/icons/Info.png"),
        "DotsThreeOutline": require("../assets/icons/DotsThreeOutline.png"),
        "Check": require("../assets/icons/Check.png"),
        "TrashSimple": require("../assets/icons/TrashSimple.png"),
        "PencilSimple": require("../assets/icons/PencilSimple.png"),
        "Plus": require("../assets/icons/Plus.png"),
        "X": require("../assets/icons/X.png"),
        "X-white": require("../assets/icons/X-white.png"),
        "CheckBox": require("../assets/icons/CheckBox.png"),
        "CheckBox-checked": require("../assets/icons/CheckBox-checked.png"),
        "mail": require("../assets/icons/mail.png"),
        "lock": require("../assets/icons/lock.png"),
        "visibility-off": require("../assets/icons/visibility-off.png"),
        "visibility": require("../assets/icons/visibility.png"),
        "checked-circle": require("../assets/icons/checked-circle.png"),
        "cancel": require("../assets/icons/mark.png"),
    };

    return iconMap[iconName] || null; // Return the mapped icon or null if not found
};




