export interface Notification {
    notificationId: number;
    userId: number;
    userName: string;
    message: string;
    date: string; // Use `Date` if you plan to parse it into a JavaScript Date object
    time: string; // Use `Date` or DateTime if you plan to combine date & time
    hasSeen: boolean;
    employeeVisibleId: string;
    senderId: number;
    senderImage: string;
    resourceId: number | null;
    resourceType: string | null;
}


export const generateDefaultNotification = (): Notification => ({
    notificationId: 0,
    userId: 0,
    userName: "Anonymous",
    message: "This is a default notification message.",
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    time: new Date().toLocaleTimeString(), // Current time in HH:MM:SS AM/PM format
    hasSeen: false,
    employeeVisibleId: "0000",
    senderId: 0,
    senderImage: "", // Placeholder image URL
    resourceId: null,
    resourceType: null,
});


export const defaultNotification = generateDefaultNotification();


