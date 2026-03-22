/**
 * Saucedemo Fixture
 * 
 * Test data untuk Saucedemo Swag Labs tests.
 * Data terpisah dari kode test sesuai SOUL.md best practices.
 */

/**
 * Interface untuk Saucedemo User data
 */
export interface SaucedemoUserData {
    username: string;
    password: string;
    description: string;
}

/**
 * Standard user fixture - User normal yang bisa login
 */
export const standardUser: SaucedemoUserData = {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard user with valid credentials',
};

/**
 * Locked out user fixture - User yang terkunci
 */
export const lockedOutUser: SaucedemoUserData = {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'User that has been locked out',
};

/**
 * Problem user fixture - User dengan masalah visual/produk
 */
export const problemUser: SaucedemoUserData = {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'User with visual/product functionality issues',
};

/**
 * Performance glitch user fixture - User dengan delay performa
 */
export const performanceGlitchUser: SaucedemoUserData = {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'User with performance delay',
};

/**
 * Error user fixture - User yang memicu error pada aksi tertentu
 */
export const errorUser: SaucedemoUserData = {
    username: 'error_user',
    password: 'secret_sauce',
    description: 'User that triggers errors on certain actions',
};

/**
 * Visual user fixture - User dengan tampilan UI berbeda
 */
export const visualUser: SaucedemoUserData = {
    username: 'visual_user',
    password: 'secret_sauce',
    description: 'User with different UI layout or broken elements',
};

/**
 * Invalid password fixture - Password yang salah
 */
export const invalidPassword: SaucedemoUserData = {
    username: 'standard_user',
    password: 'wrong_password',
    description: 'Valid username with invalid password',
};

/**
 * Empty username fixture - Username kosong
 */
export const emptyUsername: SaucedemoUserData = {
    username: '',
    password: 'secret_sauce',
    description: 'Empty username with valid password',
};

/**
 * Empty password fixture - Password kosong
 */
export const emptyPassword: SaucedemoUserData = {
    username: 'standard_user',
    password: '',
    description: 'Valid username with empty password',
};

/**
 * Get user fixture berdasarkan type
 */
export const getSaucedemoUserFixture = (
    type: 'standard' | 'locked' | 'problem' | 'performance' | 'error' | 'visual' | 'invalidPassword' | 'emptyUsername' | 'emptyPassword'
): SaucedemoUserData => {
    switch (type) {
        case 'locked':
            return lockedOutUser;
        case 'problem':
            return problemUser;
        case 'performance':
            return performanceGlitchUser;
        case 'error':
            return errorUser;
        case 'visual':
            return visualUser;
        case 'invalidPassword':
            return invalidPassword;
        case 'emptyUsername':
            return emptyUsername;
        case 'emptyPassword':
            return emptyPassword;
        case 'standard':
        default:
            return standardUser;
    }
};

/**
 * Error messages untuk Saucedemo
 */
export const SaucedemoErrorMessages = {
    LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
    USERNAME_REQUIRED: 'Epic sadface: Username is required',
    PASSWORD_REQUIRED: 'Epic sadface: Password is required',
    INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
};
