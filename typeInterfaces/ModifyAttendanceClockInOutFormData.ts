export interface ModifyAttendanceClockInOutFormData {
    employeeId: number | undefined; // employeeId could be null if user data is not available
    punchTimeInMillis: number | undefined; // Time in milliseconds, could also be null
    latitude: number | null; // Latitude, nullable if location is unavailable
    longitude: number | null; // Longitude, nullable if location is unavailable
}