import { AttendanceAdditionalInfo } from "./AttendanceAdditionalInfo";



export interface Attendance {
    id: number;
    date: string;
    employeeVisibleId: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    designationName: string;
    departmentName: string;
    inTime: string | null;
    outTime: string | null;
    status: string;
    companyName: string;
    companyId: number;
    locationAlias: string;
    locationId: number;
    isEdited: boolean | null;
    isInTimeEdited: boolean | null;
    isOutTimeEdited: boolean | null;
    employmentStatus: string;
    updatedInTime: string | null;
    updatedOutTime: string | null;
    sendEditRequest: boolean | null;
    editReason: string | null;
    updatedStatus: string | null;
    isAcceptedByLM: boolean | null;
    isRejectedByLM: boolean | null;
    lateTimeDiff: string | null;
    sendingDate: string | null;
    acceptedDate: string | null;
    rejectedDate: string | null;
    attendanceRoasterLateTime: string;
    attendanceRoasterStartTime: string;
    attendanceAdditionalInfo: AttendanceAdditionalInfo;
    compensationLeaveApplicable: boolean;
}


export const defaultAttendance: Attendance = {
    id: 0,
    date: '',
    employeeVisibleId: '',
    employeeId: 0,
    firstName: '',
    lastName: '',
    designationName: '',
    departmentName: '',
    inTime: null,
    outTime: null,
    status: '',
    companyName: '',
    companyId: 0,
    locationAlias: '',
    locationId: 0,
    isEdited: null,
    isInTimeEdited: null,
    isOutTimeEdited: null,
    employmentStatus: '',
    updatedInTime: null,
    updatedOutTime: null,
    sendEditRequest: null,
    editReason: null,
    updatedStatus: null,
    isAcceptedByLM: null,
    isRejectedByLM: null,
    lateTimeDiff: null,
    sendingDate: null,
    acceptedDate: null,
    rejectedDate: null,
    attendanceRoasterLateTime: '',
    attendanceRoasterStartTime: '',
    attendanceAdditionalInfo: {
        id: 0,
        rosterId: 0,
        rosterName: '',
        shiftId: null,
        shiftName: null,
        shiftStartTime: '',
        shiftEndTime: '',
        shiftLateTime: '',
        isHalfDay: false,
        modifiedStatus: null,
        remarks: null,
        modifiedBy: null,
        modifiedByUsername: null,
    },
    compensationLeaveApplicable: false,
};