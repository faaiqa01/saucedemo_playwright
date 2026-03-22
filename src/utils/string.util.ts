/**
 * String Utility
 * 
 * Helper functions untuk string manipulation.
 */

/**
 * Generate random string
 * @param length - Panjang string yang dihasilkan
 * @param charset - Karakter yang digunakan (default: alphanumeric)
 */
export const generateRandomString = (
    length: number,
    charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
};

/**
 * Generate random email
 * @param prefix - Prefix untuk email (default: 'test')
 */
export const generateRandomEmail = (prefix: string = 'test'): string => {
    const timestamp = Date.now();
    const randomString = generateRandomString(8);
    return `${prefix}_${randomString}_${timestamp}@example.com`;
};

/**
 * Generate random username
 * @param prefix - Prefix untuk username (default: 'user')
 */
export const generateRandomUsername = (prefix: string = 'user'): string => {
    const timestamp = Date.now();
    const randomString = generateRandomString(6);
    return `${prefix}_${randomString}_${timestamp}`;
};

/**
 * Capitalize first letter of string
 * @param str - String yang akan di-capitalize
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to camelCase
 * @param str - String yang akan dikonversi
 */
export const toCamelCase = (str: string): string => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
};

/**
 * Convert string to snake_case
 * @param str - String yang akan dikonversi
 */
export const toSnakeCase = (str: string): string => {
    return str
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('_');
};

/**
 * Truncate string to specified length
 * @param str - String yang akan di-truncate
 * @param maxLength - Maksimal panjang string
 * @param suffix - Suffix untuk menandakan string terpotong (default: '...')
 */
export const truncate = (str: string, maxLength: number, suffix: string = '...'): string => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Remove all whitespace from string
 * @param str - String yang akan dihapus whitespace-nya
 */
export const removeWhitespace = (str: string): string => {
    return str.replace(/\s+/g, '');
};

/**
 * Check if string is empty or only whitespace
 * @param str - String yang dicek
 */
export const isEmpty = (str: string): boolean => {
    return str.trim().length === 0;
};

/**
 * Check if string is valid email format
 * @param email - Email yang dicek
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Mask sensitive data (e.g., password, credit card)
 * @param str - String yang akan di-mask
 * @param visibleChars - Jumlah karakter yang tetap terlihat (default: 4)
 */
export const maskString = (str: string, visibleChars: number = 4): string => {
    if (str.length <= visibleChars) {
        return '*'.repeat(str.length);
    }
    const visible = str.slice(0, visibleChars);
    const masked = '*'.repeat(str.length - visibleChars);
    return visible + masked;
};

/**
 * Generate password with specified requirements
 * @param length - Panjang password (default: 12)
 * @param options - Opsi untuk password requirements
 */
export const generatePassword = (
    length: number = 12,
    options: {
        uppercase?: boolean;
        lowercase?: boolean;
        numbers?: boolean;
        symbols?: boolean;
    } = {}
): string => {
    const {
        uppercase = true,
        lowercase = true,
        numbers = true,
        symbols = true,
    } = options;

    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
        throw new Error('At least one character type must be selected');
    }

    return generateRandomString(length, charset);
};
