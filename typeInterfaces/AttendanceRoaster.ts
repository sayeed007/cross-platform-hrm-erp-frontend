export interface AttendanceRoaster {
    id: number;
    officeStartTime: string;
    officeEndTime: string;
    shiftName: string;
    lateTime: string;
    isConditionalWeekend: boolean;
    interval: string | null;
    conditionalWeekendDay: string | null;
    effectiveDate: string | null;
    weekendType: string;
    numberOfWorkingDays: number | null;
    numberOfWeekends: number | null;
    weekends: string[];
    shiftTimeInformations: any[];
    shiftOrder: any[];
    roasterType: string;
    rollingType: string | null;
    rollingDuration: string | null;
    halfDays: any[];
    hasHalfDay: boolean;
    halfDayEndTime: string | null;
    employeeEffectiveDateDTOs: any[];
}