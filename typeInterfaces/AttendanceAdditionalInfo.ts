export interface AttendanceAdditionalInfo {
    id: number;
    rosterId: number;
    rosterName: string;
    shiftId: number | null;
    shiftName: string | null;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftLateTime: string;
    isHalfDay: boolean;
    modifiedStatus: string | null;
    remarks: string | null;
    modifiedBy: string | null;
    modifiedByUsername: string | null;
}