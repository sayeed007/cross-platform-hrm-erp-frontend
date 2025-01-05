// Secret key (must be the same for both encryption and decryption)
const SECRET_KEY = 'your-secret-key'; // Replace with your key

/**
 * Encrypt data using XOR logic and Base64 encoding
 * @param data - Data to encrypt
 * @returns Encrypted string
 */
export const encryptData = (data: object): string => {
    const jsonString = JSON.stringify(data);
    const encrypted = jsonString
        .split('')
        .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(index % SECRET_KEY.length)))
        .join('');
    return btoa(encrypted); // Base64 encode the encrypted string
};

/**
 * Decrypt data using XOR logic and Base64 decoding
 * @param cipherText - Encrypted string
 * @returns Decrypted object
 */
export const decryptData = (cipherText: string): object | null => {
    try {
        const decoded = atob(cipherText); // Base64 decode
        const decrypted = decoded
            .split('')
            .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(index % SECRET_KEY.length)))
            .join('');
        return JSON.parse(decrypted);
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
    }
};
