/**
 * Common Utility
 * 
 * Helper functions umum yang sering digunakan di tests.
 */

/**
 * Delay execution for specified milliseconds
 * @param ms - Milliseconds to delay
 * @deprecated Gunakan waitFor* methods dari Playwright sebagai gantinya
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate random number within range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 */
export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Generate random float within range
 * @param min - Minimum value
 * @param max - Maximum value
 * @param decimals - Number of decimal places (default: 2)
 */
export const randomFloat = (min: number, max: number, decimals: number = 2): number => {
    const num = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(decimals));
};

/**
 * Generate random boolean
 */
export const randomBoolean = (): boolean => {
    return Math.random() < 0.5;
};

/**
 * Pick random element from array
 * @param array - Array to pick from
 */
export const randomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array
 * @param array - Array to shuffle
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Generate unique ID
 * @param prefix - Prefix untuk ID
 */
export const generateId = (prefix: string = 'id'): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `${prefix}_${timestamp}_${random}`;
};

/**
 * Deep clone object
 * @param obj - Object yang akan di-clone
 */
export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param obj - Object yang dicek
 */
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
    return Object.keys(obj).length === 0;
};

/**
 * Merge objects
 * @param target - Object target
 * @param sources - Objects yang akan di-merge
 */
export const mergeObjects = <T extends Record<string, unknown>>(
    target: T,
    ...sources: Partial<T>[]
): T => {
    return Object.assign({}, target, ...sources);
};

/**
 * Get nested value from object using dot notation
 * @param obj - Object
 * @param path - Path ke property (e.g., 'user.profile.name')
 */
export const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce<unknown>((current, key) => {
        return current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined;
    }, obj);
};

/**
 * Set nested value in object using dot notation
 * @param obj - Object
 * @param path - Path ke property (e.g., 'user.profile.name')
 * @param value - Value yang akan diset
 */
export const setNestedValue = (
    obj: Record<string, unknown>,
    path: string,
    value: unknown
): void => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    
    const target = keys.reduce((current, key) => {
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }
        return current[key] as Record<string, unknown>;
    }, obj);
    
    target[lastKey] = value;
};

/**
 * Format currency
 * @param amount - Amount yang akan diformat
 * @param currency - Currency code (default: 'IDR')
 * @param locale - Locale untuk formatting (default: 'id-ID')
 */
export const formatCurrency = (
    amount: number,
    currency: string = 'IDR',
    locale: string = 'id-ID'
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

/**
 * Format percentage
 * @param value - Nilai yang akan diformat
 * @param decimals - Jumlah desimal (default: 2)
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Retry function with exponential backoff
 * @param fn - Function yang akan di-retry
 * @param maxRetries - Maksimal retry (default: 3)
 * @param delayMs - Initial delay in milliseconds (default: 1000)
 */
export const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<T> => {
    let lastError: Error | undefined;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (i < maxRetries - 1) {
                const backoffDelay = delayMs * Math.pow(2, i);
                await delay(backoffDelay);
            }
        }
    }
    
    throw lastError;
};

/**
 * Debounce function
 * @param fn - Function yang akan di-debounce
 * @param delayMs - Delay dalam milliseconds
 */
export const debounce = <T extends (...args: unknown[]) => void>(
    fn: T,
    delayMs: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => fn(...args), delayMs);
    };
};

/**
 * Throttle function
 * @param fn - Function yang akan di-throttle
 * @param limitMs - Limit dalam milliseconds
 */
export const throttle = <T extends (...args: unknown[]) => void>(
    fn: T,
    limitMs: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean = false;
    
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limitMs);
        }
    };
};
