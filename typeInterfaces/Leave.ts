// Define props type
export interface LeaveDataItem {
    leaveType: string;
    actualLeaveCount: number;
    remainingLeaveCount: number;
    leaveColor: string | null;
}


export interface SelectLeaveRangeProps {
    startDate: string | null; // Initial start date
    setStartDate: (date: string | null) => void; // Callback to set start date
    endDate: string | null; // Initial end date
    setEndDate: (date: string | null) => void; // Callback to set end date
    onNext: () => void; // Callback to set end date
}