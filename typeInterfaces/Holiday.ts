import moment from 'moment';

export interface Holiday {
    id: number; // Unique identifier for the holiday.
    holidayTitle: string; // Title of the holiday.
    holidayStartDate: string; // Start date of the holiday in 'YYYY-MM-DD' format.
    holidayEndDate: string; // End date of the holiday in 'YYYY-MM-DD' format.
    holidayDuration: number; // Duration of the holiday in days.
    holidayDescription: string; // Description of the holiday.
    attachmentUrl: string | null; // URL for any attached document or file, can be null if not applicable.
}

export interface HolidayWithMonth {
    id: number; // Unique identifier for the holiday.
    holidayTitle: string; // Title of the holiday.
    holidayStartDate: string; // Start date of the holiday in 'YYYY-MM-DD' format.
    holidayEndDate: string; // End date of the holiday in 'YYYY-MM-DD' format.
    holidayDuration: number; // Duration of the holiday in days.
    holidayDescription: string; // Description of the holiday.
    attachmentUrl: string | null; // URL for any attached document or file, can be null if not applicable.
    month: string;
}

export interface HolidayPolicy {
    id: number;
    holidayPolicyName: string;
    year: number | null;
    description: string;
    attachments: any[]; // Replace `any` with the specific attachment type if available
    companyId: number;
    holidays: Holiday[];
    employeeIds: number[];
    employees: any[]; // Replace `any` with the specific employee type if available
};

// Default generator function
export const generateDefaultHoliday = (): HolidayWithMonth => {
    const today = moment();
    return {
        id: 0,
        holidayTitle: 'New Holiday',
        holidayStartDate: today.format('YYYY-MM-DD'),
        holidayEndDate: today.format('YYYY-MM-DD'),
        holidayDuration: 1,
        holidayDescription: 'Default holiday description',
        attachmentUrl: null,
        month: today.format('MMMM'), // Current month name
    };
};

// Default holiday object
export const defaultHolidayWithMonth: HolidayWithMonth = {
    ...generateDefaultHoliday(),
};
