import { colors } from "./colors";
import { textStyle } from "./textStyle";


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
        textTransform: "capitalize"
    },
    absent: {
        color: colors.absent,
        backgroundColor: colors.absentBG,
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    late: {
        color: colors.late,
        backgroundColor: colors.lateBG,
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    weekend: {
        color: colors.gray2,
        backgroundColor: "rgba(128, 128, 128, 0.1)", // 10% of colors.gray2
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    holiday: {
        color: "#0F75BC",
        backgroundColor: "rgba(15, 117, 188, 0.1)", // 10% of #0F75BC
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    AFL: {
        color: colors.red,
        backgroundColor: "rgba(255, 0, 0, 0.1)", // 10% of colors.red
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    annual: {
        color: "#E3B7A0",
        backgroundColor: "rgba(227, 183, 160, 0.1)", // 10% of #E3B7A0
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    sick: {
        color: "#BA6BD9",
        backgroundColor: "rgba(186, 107, 217, 0.1)", // 10% of #BA6BD9
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    casual: {
        color: "#F2994A",
        backgroundColor: "rgba(242, 153, 74, 0.1)", // 10% of #F2994A
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    maternity: {
        color: "#BF286C",
        backgroundColor: "rgba(191, 40, 108, 0.1)", // 10% of #BF286C
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    paternity: {
        color: "#557A46",
        backgroundColor: "rgba(85, 122, 70, 0.1)", // 10% of #557A46
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    marriage: {
        color: "#FE1E89",
        backgroundColor: "rgba(254, 30, 137, 0.1)", // 10% of #FE1E89
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    compassionate: {
        color: "#5C4B99",
        backgroundColor: "rgba(92, 75, 153, 0.1)", // 10% of #5C4B99
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    special: {
        color: "#086E7D",
        backgroundColor: "rgba(8, 110, 125, 0.1)", // 10% of #086E7D
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    LWP: {
        color: "#1300F1",
        backgroundColor: "rgba(19, 0, 241, 0.1)", // 10% of #1300F1
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    lfa: {
        color: "#03045E",
        backgroundColor: "rgba(3, 4, 94, 0.1)", // 10% of #03045E
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    AFA: {
        color: "#BF382B",
        backgroundColor: "rgba(191, 56, 43, 0.1)", // 10% of #BF382B
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    "Shift Not Started": {
        color: "rgb(119, 11, 141)",
        backgroundColor: "rgba(119, 11, 141, 0.1)", // 10% of rgb(119, 11, 141)
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    },
    default: {
        color: "rgba(169, 169, 169, 1)",
        backgroundColor: "rgba(169, 169, 169, 0.1)", // 10% of rgba(169, 169, 169, 1)
        ...textStyle.medium12,
        borderRadius: 4,
        padding: 6,
        textTransform: "capitalize"
    }
};
