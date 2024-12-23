export const getLeaveStatusText = (status: number) => {
    switch (status) {
        case 0:
            return 'Pending'; // Pending status
        case 1:
            return 'Approved'; // Success/Approved status
        case 2:
            return 'Rejected'; // Rejected status
        default:
            return ''; // Optional: Default fallback text
    }
};

export const generateLeaveType = (title: string) => {
    return `${title?.charAt(0)?.toUpperCase()}${title?.slice(1)?.toLowerCase()} Leave`;
};