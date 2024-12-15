export function getGreeting(): string {
    const now = new Date(); // Get the current date and time
    const hour = now.getHours(); // Extract the current hour (0-23)

    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}