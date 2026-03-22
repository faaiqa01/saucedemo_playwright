/**
 * User Fixture
 * 
 * Test data untuk user-related tests.
 * Data terpisah dari kode test sesuai SOUL.md best practices.
 */

/**
 * Interface untuk User data
 */
export interface UserData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

/**
 * Valid user fixture untuk login test
 */
export const validUser: UserData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'TestPass123!',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
};

/**
 * Admin user fixture
 */
export const adminUser: UserData = {
    username: 'admin',
    email: 'admin@example.com',
    password: 'AdminPass123!',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
};

/**
 * Invalid user fixture untuk negative test
 */
export const invalidUser = {
    username: 'invaliduser',
    email: 'invalid@example.com',
    password: 'WrongPass123!',
};

/**
 * User dengan password yang lemah (untuk validation test)
 */
export const weakPasswordUser = {
    username: 'weakpassuser',
    email: 'weakpass@example.com',
    password: '123', // Password terlalu pendek
};

/**
 * User dengan email format yang salah
 */
export const invalidEmailUser = {
    username: 'invalidemail',
    email: 'invalid-email-format', // Format email salah
    password: 'ValidPass123!',
};

/**
 * User baru untuk registration test
 */
export const newUser: UserData = {
    username: 'newuser',
    email: 'newuser@example.com',
    password: 'NewUserPass123!',
    firstName: 'New',
    lastName: 'User',
    fullName: 'New User',
};

/**
 * Generate random user untuk dynamic test
 */
export const generateRandomUser = (): UserData => {
    const timestamp = Date.now();
    return {
        username: `user_${timestamp}`,
        email: `user_${timestamp}@example.com`,
        password: `Pass${timestamp}!`,
        firstName: 'Random',
        lastName: 'User',
        fullName: 'Random User',
    };
};

/**
 * Get user fixture berdasarkan type
 */
export const getUserFixture = (type: 'valid' | 'admin' | 'invalid' | 'new'): UserData => {
    switch (type) {
        case 'admin':
            return adminUser;
        case 'new':
            return newUser;
        case 'invalid':
            return invalidUser as UserData;
        case 'valid':
        default:
            return validUser;
    }
};
