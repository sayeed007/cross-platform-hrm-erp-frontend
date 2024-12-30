export const capitalizeFirstLetter = (str: string): string => {
    if (!str) {
        return ''; // Handle empty string case
    }
    const [first, ...rest] = str;
    return [first.toUpperCase(), ...rest].join('');
};