import moment from "moment";
import { colors } from "./colors";
import { textStyle } from "./textStyle";
import { Attendance } from "../typeInterfaces/Attendance";


export type AttendanceStatusKey =
    | 'present'
    | 'absent'
    | 'late'
    | 'weekend'
    | 'holiday'
    | 'AFL'
    | 'annual'
    | 'sick'
    | 'casual'
    | 'maternity'
    | 'paternity'
    | 'marriage'
    | 'compassionate'
    | 'special'
    | 'LWP'
    | 'lfa'
    | 'AFA'
    | 'Shift Not Started'
    | 'default';


export interface AttendanceStatusStyle {
    color: string;
    backgroundColor: string;
    borderRadius: number;
    padding: number;
    [key: string]: any; // To allow additional properties like `...textStyle.medium12`
}

export const attendanceStatus: Record<AttendanceStatusKey, AttendanceStatusStyle> = {
    present: {
        color: colors.success,
        backgroundColor: colors.successBG,
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    absent: {
        color: colors.absent,
        backgroundColor: colors.absentBG,
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    late: {
        color: colors.late,
        backgroundColor: colors.lateBG,
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    weekend: {
        color: colors.gray2,
        backgroundColor: "rgba(128, 128, 128, 0.1)", // 10% of colors.gray2
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    holiday: {
        color: "#0F75BC",
        backgroundColor: "rgba(15, 117, 188, 0.1)", // 10% of #0F75BC
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    AFL: {
        color: colors.red,
        backgroundColor: "rgba(255, 0, 0, 0.1)", // 10% of colors.red
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    annual: {
        color: "#E3B7A0",
        backgroundColor: "rgba(227, 183, 160, 0.1)", // 10% of #E3B7A0
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    sick: {
        color: "#BA6BD9",
        backgroundColor: "rgba(186, 107, 217, 0.1)", // 10% of #BA6BD9
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    casual: {
        color: "#F2994A",
        backgroundColor: "rgba(242, 153, 74, 0.1)", // 10% of #F2994A
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    maternity: {
        color: "#BF286C",
        backgroundColor: "rgba(191, 40, 108, 0.1)", // 10% of #BF286C
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    paternity: {
        color: "#557A46",
        backgroundColor: "rgba(85, 122, 70, 0.1)", // 10% of #557A46
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    marriage: {
        color: "#FE1E89",
        backgroundColor: "rgba(254, 30, 137, 0.1)", // 10% of #FE1E89
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    compassionate: {
        color: "#5C4B99",
        backgroundColor: "rgba(92, 75, 153, 0.1)", // 10% of #5C4B99
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    special: {
        color: "#086E7D",
        backgroundColor: "rgba(8, 110, 125, 0.1)", // 10% of #086E7D
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    LWP: {
        color: "#1300F1",
        backgroundColor: "rgba(19, 0, 241, 0.1)", // 10% of #1300F1
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    lfa: {
        color: "#03045E",
        backgroundColor: "rgba(3, 4, 94, 0.1)", // 10% of #03045E
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    AFA: {
        color: "#BF382B",
        backgroundColor: "rgba(191, 56, 43, 0.1)", // 10% of #BF382B
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    "Shift Not Started": {
        color: "rgb(119, 11, 141)",
        backgroundColor: "rgba(119, 11, 141, 0.1)", // 10% of rgb(119, 11, 141)
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    },
    default: {
        color: "rgba(169, 169, 169, 1)",
        backgroundColor: "rgba(169, 169, 169, 0.1)", // 10% of rgba(169, 169, 169, 1)
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
    }
};


export const cards = [
    { name: 'Absent', count: 0, color: colors.absent, bgColor: colors.absentBG },
    { name: 'Late', count: 0, color: colors.late, bgColor: colors.lateBG },
    { name: 'Leave', count: 0, color: colors.leave, bgColor: colors.leaveBG },
];


// Attendance[]
export const attendanceDataPreparation = (attendance: Attendance[]) => {
    const allAttendance = [...attendance];
    allAttendance.sort((a, b) => {
        return moment(b.date).diff(moment(a.date));
    });

    const dummySummaryCards = JSON.parse(JSON.stringify(cards));

    const updatedAttendance = allAttendance.map((item, index) => {
        // Update the summary card counts based on status
        switch (item?.status) {
            case "AFA":
            case "AFL":
            case "absent":
                dummySummaryCards[0].count += 1;
                break;
            case "late":
                dummySummaryCards[1].count += 1;
                break;
            // No action needed for these cases
            case "present":
            case "half day":
            case "holiday":
            case "weekend":
                break;
            default:

                // Any unrecognized leave type is treated as 'Other'
                dummySummaryCards[2].count += 1;
                break;
        }

        // Process and extend the attendance object
        const inTime = item.inTime ?? moment(item.date, 'YYYY-MM-DD').format("YYYY-MM-DD HH:mm:ss");
        const outTime = item.outTime ?? moment(item.date, 'YYYY-MM-DD').format("YYYY-MM-DD HH:mm:ss");
        const finalInTime = item?.isEdited && item.isInTimeEdited
            ? item.updatedInTime ?? "00:00:00"
            : inTime;
        const finalOutTime = item?.isEdited && item.isOutTimeEdited
            ? item.updatedOutTime ?? "00:00:00"
            : outTime;

        // Calculate total hours worked
        const totalHour = (finalInTime !== "00:00:00" && finalOutTime !== "00:00:00")
            ? moment
                .utc(
                    moment(finalOutTime, "DD-MM-YYYY HH:mm:ss").diff(
                        moment(finalInTime, "DD-MM-YYYY HH:mm:ss")
                    )
                )
                .format("HH:mm:ss")
            : "00:00:00";

        const status = item?.sendEditRequest
            ? "AFA"
            : (item?.status === "unpaid"
                ? "LWP"
                :
                ((item.status === 'absent' && moment().isBefore(moment(item?.attendanceRoasterStartTime ? item?.attendanceRoasterStartTime : '', 'HH:mm:ss'))
                    && moment(item?.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'))
                    ? 'Shift Not Started'
                    : item.status
                )
            );

        return {
            ...item,
            name: `${item.firstName} ${item.lastName}`,
            inTime,
            outTime,
            finalInTime,
            finalOutTime,
            totalHour,
            status
        };
    });

    return {
        updatedAttendance,
        dummySummaryCards,
    };

}

export const getStatusStyle = (status: string): AttendanceStatusStyle => {
    return attendanceStatus[status as AttendanceStatusKey] || attendanceStatus.default;
};
