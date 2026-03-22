/**
 * Date Utility
 * 
 * Helper functions untuk date manipulation dan formatting.
 */

/**
 * Format date to specified format
 * @param date - Date yang akan diformat
 * @param format - Format yang diinginkan (default: 'YYYY-MM-DD')
 */
export const formatDate = (
    date: Date,
    format: string = 'YYYY-MM-DD'
): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

/**
 * Get current date formatted
 * @param format - Format yang diinginkan
 */
export const getCurrentDate = (format: string = 'YYYY-MM-DD'): string => {
    return formatDate(new Date(), format);
};

/**
 * Add days to date
 * @param date - Date awal
 * @param days - Jumlah hari yang ditambahkan
 */
export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

/**
 * Subtract days from date
 * @param date - Date awal
 * @param days - Jumlah hari yang dikurangi
 */
export const subtractDays = (date: Date, days: number): Date => {
    return addDays(date, -days);
};

/**
 * Add months to date
 * @param date - Date awal
 * @param months - Jumlah bulan yang ditambahkan
 */
export const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

/**
 * Add years to date
 * @param date - Date awal
 * @param years - Jumlah tahun yang ditambahkan
 */
export const addYears = (date: Date, years: number): Date => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
};

/**
 * Get date in the future
 * @param days - Jumlah hari ke depan
 */
export const getFutureDate = (days: number): Date => {
    return addDays(new Date(), days);
};

/**
 * Get date in the past
 * @param days - Jumlah hari ke belakang
 */
export const getPastDate = (days: number): Date => {
    return subtractDays(new Date(), days);
};

/**
 * Calculate difference between two dates in days
 * @param date1 - Date pertama
 * @param date2 - Date kedua
 */
export const daysBetween = (date1: Date, date2: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

/**
 * Check if date is in the future
 * @param date - Date yang dicek
 */
export const isFutureDate = (date: Date): boolean => {
    return date > new Date();
};

/**
 * Check if date is in the past
 * @param date - Date yang dicek
 */
export const isPastDate = (date: Date): boolean => {
    return date < new Date();
};

/**
 * Check if date is today
 * @param date - Date yang dicek
 */
export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

/**
 * Get age from birth date
 * @param birthDate - Tanggal lahir
 */
export const getAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
};

/**
 * Parse date string to Date object
 * @param dateString - String tanggal yang akan diparse
 * @param format - Format dari string tanggal
 */
export const parseDate = (dateString: string, format: string = 'YYYY-MM-DD'): Date => {
    const year = parseInt(dateString.match(/YYYY/) ? dateString.substring(0, 4) : '0');
    const month = parseInt(dateString.match(/MM/) ? dateString.substring(5, 7) : '0') - 1;
    const day = parseInt(dateString.match(/DD/) ? dateString.substring(8, 10) : '0');
    
    return new Date(year, month, day);
};

/**
 * Get start of day
 * @param date - Date awal
 */
export const startOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

/**
 * Get end of day
 * @param date - Date awal
 */
export const endOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};

/**
 * Get start of month
 * @param date - Date awal
 */
export const startOfMonth = (date: Date): Date => {
    const result = new Date(date);
    result.setDate(1);
    return startOfDay(result);
};

/**
 * Get end of month
 * @param date - Date awal
 */
export const endOfMonth = (date: Date): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    result.setDate(0);
    return endOfDay(result);
};
