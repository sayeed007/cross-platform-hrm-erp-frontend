import { Attendance } from "./Attendance";
import { AttendanceRoaster } from "./AttendanceRoaster";

export interface UserAttendanceInformationForClocking {
    attendance: Attendance;
    lastAttendanceWithInTime: Attendance;
    attendanceRoaster: AttendanceRoaster;
}