import moment from "moment";

export const timeOptionsGenerator = () => {
    const times = [];
    const startOfDay = moment().startOf('day'); // Start at 12:00 AM

    for (let i = 0; i < 1440; i++) { // 1440 minutes in a day
        times.push({
            label: startOfDay.clone().add(i, 'minutes').format('hh:mm A'), // Format: 12:00 AM, 12:01 AM, etc.
            value: startOfDay.clone().add(i, 'minutes').format('HH:mm'), // Value: 24-hour time format (e.g., 00:00)
        });
    }
    return times;
};