export const hexToRgba = (hex: string): string => {
    // Remove the hash if present
    const sanitizedHex = hex.replace("#", "");

    // Parse the red, green, and blue components from the hex
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);

    // Return the rgba color string with 15% alpha
    return `rgba(${r}, ${g}, ${b}, 0.15)`;
}