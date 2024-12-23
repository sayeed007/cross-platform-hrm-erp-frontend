export interface DirectoryEmployee {
    employeeId: number;
    firstName: string;
    lastName: string;
    designation: string;
    department: string;
    officialContact: string;
    username: string;
    thumbNailsPath02?: string; // Optional field for thumbnail
}

export interface DirectoryEmployeeOption {
    value: string | number;
    label: string;
    employeeId?: number;
    designation?: string;
    department?: string;
    phone?: string;
    email?: string;
    profileShowImage?: string;
    customAbbreviation?: JSX.Element;
    isDisabled?: boolean;
}