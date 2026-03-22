import { test, expect } from '@playwright/test';
import {
    generateRandomString,
    generateRandomEmail,
    generateRandomUsername,
    capitalize,
    toCamelCase,
    toSnakeCase,
    truncate,
    removeWhitespace,
    isEmpty,
    isValidEmail,
    maskString,
    generatePassword,
} from '../../src/utils/string.util';
import {
    formatDate,
    getCurrentDate,
    addDays,
    subtractDays,
    getFutureDate,
    getPastDate,
    daysBetween,
    isFutureDate,
    isPastDate,
    isToday,
    getAge,
} from '../../src/utils/date.util';
import {
    randomInt,
    randomFloat,
    randomBoolean,
    randomElement,
    shuffleArray,
    generateId,
    deepClone,
    isEmptyObject,
    mergeObjects,
    formatCurrency,
    formatPercentage,
} from '../../src/utils/common.util';

/**
 * Unit Tests untuk Utilities
 * 
 * Test suite untuk utility functions.
 * Mengikuti best practices dari SOUL.md:
 * - Focused unit tests
 * - Specific assertions
 * - Test edge cases
 */

test.describe('String Utilities', () => {
    test('generateRandomString creates string with correct length', () => {
        const result = generateRandomString(10);
        expect(result).toHaveLength(10);
    });

    test('generateRandomEmail creates valid email format', () => {
        const result = generateRandomEmail();
        expect(isValidEmail(result)).toBe(true);
    });

    test('generateRandomUsername creates unique usernames', () => {
        const result1 = generateRandomUsername();
        const result2 = generateRandomUsername();
        expect(result1).not.toBe(result2);
    });

    test('capitalize capitalizes first letter', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('HELLO')).toBe('Hello');
        expect(capitalize('hELLO')).toBe('Hello');
    });

    test('toCamelCase converts string to camelCase', () => {
        expect(toCamelCase('hello world')).toBe('helloWorld');
        expect(toCamelCase('Hello World')).toBe('helloWorld');
        expect(toCamelCase('hello-world')).toBe('helloWorld');
    });

    test('toSnakeCase converts string to snake_case', () => {
        expect(toSnakeCase('hello world')).toBe('hello_world');
        expect(toSnakeCase('HelloWorld')).toBe('hello_world');
        expect(toSnakeCase('hello-world')).toBe('hello_world');
    });

    test('truncate truncates string to max length', () => {
        expect(truncate('Hello World', 5)).toBe('He...');
        expect(truncate('Hi', 10)).toBe('Hi');
    });

    test('removeWhitespace removes all whitespace', () => {
        expect(removeWhitespace('Hello World')).toBe('HelloWorld');
        expect(removeWhitespace('  Hello  World  ')).toBe('HelloWorld');
    });

    test('isEmpty checks if string is empty', () => {
        expect(isEmpty('')).toBe(true);
        expect(isEmpty('   ')).toBe(true);
        expect(isEmpty('hello')).toBe(false);
    });

    test('isValidEmail validates email format', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('invalid-email')).toBe(false);
        expect(isValidEmail('test@')).toBe(false);
    });

    test('maskString masks sensitive data', () => {
        expect(maskString('password123', 4)).toBe('pass********');
        expect(maskString('123', 4)).toBe('***');
    });

    test('generatePassword generates password with requirements', () => {
        const password = generatePassword(12, {
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true,
        });
        expect(password).toHaveLength(12);
    });
});

test.describe('Date Utilities', () => {
    test('formatDate formats date correctly', () => {
        const date = new Date('2024-01-15');
        expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    test('getCurrentDate returns current date', () => {
        const result = getCurrentDate();
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    test('addDays adds days to date', () => {
        const date = new Date('2024-01-15');
        const result = addDays(date, 5);
        expect(result.getDate()).toBe(20);
    });

    test('subtractDays subtracts days from date', () => {
        const date = new Date('2024-01-15');
        const result = subtractDays(date, 5);
        expect(result.getDate()).toBe(10);
    });

    test('getFutureDate returns date in future', () => {
        const result = getFutureDate(5);
        expect(isFutureDate(result)).toBe(true);
    });

    test('getPastDate returns date in past', () => {
        const result = getPastDate(5);
        expect(isPastDate(result)).toBe(true);
    });

    test('daysBetween calculates days between dates', () => {
        const date1 = new Date('2024-01-15');
        const date2 = new Date('2024-01-20');
        expect(daysBetween(date1, date2)).toBe(5);
    });

    test('isFutureDate checks if date is in future', () => {
        const futureDate = getFutureDate(1);
        expect(isFutureDate(futureDate)).toBe(true);
        expect(isFutureDate(new Date('2020-01-01'))).toBe(false);
    });

    test('isPastDate checks if date is in past', () => {
        const pastDate = getPastDate(1);
        expect(isPastDate(pastDate)).toBe(true);
        expect(isPastDate(getFutureDate(1))).toBe(false);
    });

    test('isToday checks if date is today', () => {
        expect(isToday(new Date())).toBe(true);
        expect(isToday(new Date('2020-01-01'))).toBe(false);
    });

    test('getAge calculates age from birth date', () => {
        const birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - 25);
        expect(getAge(birthDate)).toBe(25);
    });
});

test.describe('Common Utilities', () => {
    test('randomInt generates random integer in range', () => {
        const result = randomInt(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThan(10);
    });

    test('randomFloat generates random float in range', () => {
        const result = randomFloat(1.0, 10.0);
        expect(result).toBeGreaterThanOrEqual(1.0);
        expect(result).toBeLessThanOrEqual(10.0);
    });

    test('randomBoolean generates random boolean', () => {
        const result = randomBoolean();
        expect(typeof result).toBe('boolean');
    });

    test('randomElement picks random element from array', () => {
        const array = ['a', 'b', 'c', 'd'];
        const result = randomElement(array);
        expect(array).toContain(result);
    });

    test('shuffleArray shuffles array', () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(array);
        expect(shuffled).toHaveLength(array.length);
        expect(shuffled).toEqual(expect.arrayContaining(array));
    });

    test('generateId generates unique ID', () => {
        const id1 = generateId();
        const id2 = generateId();
        expect(id1).not.toBe(id2);
        expect(id1).toMatch(/^id_\d+_[a-z0-9]+$/);
    });

    test('deepClone creates deep copy of object', () => {
        const obj = { a: 1, b: { c: 2 } };
        const cloned = deepClone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
        expect(cloned.b).not.toBe(obj.b);
    });

    test('isEmptyObject checks if object is empty', () => {
        expect(isEmptyObject({})).toBe(true);
        expect(isEmptyObject({ a: 1 })).toBe(false);
    });

    test('mergeObjects merges multiple objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const result = mergeObjects(obj1, obj2);
        expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    test('formatCurrency formats number as currency', () => {
        expect(formatCurrency(1000)).toMatch(/Rp\s*1\.000,00/);
        expect(formatCurrency(1000, 'USD', 'en-US')).toMatch(/\$1,000\.00/);
    });

    test('formatPercentage formats number as percentage', () => {
        expect(formatPercentage(0.5)).toBe('50.00%');
        expect(formatPercentage(0.1234, 1)).toBe('12.3%');
    });
});
