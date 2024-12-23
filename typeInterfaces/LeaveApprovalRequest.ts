export interface LeaveApprovalRequest {
    id: number;
    employeeVisibleId: string;
    senderId: number;
    departmentName: string;
    designationName: string;
    senderFirstName: string;
    senderLastName: string;
    startDate: string; // YYYY-MM-DD format
    endDate: string; // YYYY-MM-DD format
    duration: number;
    calendarDays: number;
    leaveType: string; // e.g., 'annual'
    leavePeriod: string; // e.g., 'FULL_DAY'
    isAccepted: number; // 0 for pending, 1 for accepted
    isAcceptedByLineManager: number;
    isAcceptedByTeamLeader: number;
    isAcceptedByHeadOfDept: number;
    isAcceptedByAdmin: number;
    isLfaPaid: boolean;
    lfaEncashmentStatus: string | null;
    sendingDate: string; // YYYY-MM-DD format
    actionDateByLineManager: string | null; // YYYY-MM-DD or null
    actionDateByTeamLeader: string | null; // YYYY-MM-DD or null
    actionDateByHeadOfDept: string | null; // YYYY-MM-DD or null
    actionDateByAdmin: string | null; // YYYY-MM-DD or null
    message: string;
    attachmentPath: string | null;
    address: string | null;
    teamLeaderId: number | null;
    headOfDepartmentId: number | null;
    uploadType: string; // e.g., 'MANUAL'
    sentForAdminApproval: boolean;
    adminActionTakenBy: number | null;
    requireAdminApproval: boolean;
    senderPhoto: string | null; // Relative path to the image
}


export const defaultLeaveApprovalRequest = {
    id: 6056,
    employeeVisibleId: "200188",
    senderId: 200188,
    departmentName: "Software",
    designationName: "Engineer II",
    senderFirstName: "Md. Taufiqur",
    senderLastName: "Rahman",
    startDate: "2024-12-17",
    endDate: "2024-12-18",
    duration: 2,
    calendarDays: 2,
    leaveType: "annual",
    leavePeriod: "FULL_DAY",
    isAccepted: 0,
    isAcceptedByLineManager: 0,
    isAcceptedByTeamLeader: 0,
    isAcceptedByHeadOfDept: 0,
    isAcceptedByAdmin: 0,
    isLfaPaid: false,
    lfaEncashmentStatus: null,
    sendingDate: "2024-12-19",
    actionDateByLineManager: null,
    actionDateByTeamLeader: null,
    actionDateByHeadOfDept: null,
    actionDateByAdmin: null,
    message: "",
    attachmentPath: null,
    address: null,
    teamLeaderId: null,
    headOfDepartmentId: null,
    uploadType: "MANUAL",
    sentForAdminApproval: false,
    adminActionTakenBy: null,
    requireAdminApproval: false,
    senderPhoto: "img/200188thumb02.jpg",
}
