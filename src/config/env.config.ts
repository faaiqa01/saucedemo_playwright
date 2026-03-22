/**
 * Environment Configuration
 * 
 * Centralized configuration untuk berbagai environment (dev, staging, prod).
 * Menggunakan environment variables untuk memisahkan config dari kode.
 */

export enum Environment {
    DEV = 'dev',
    STAGING = 'staging',
    PROD = 'prod',
}

export interface AppConfig {
    name: string;
    baseUrl: string;
    apiBaseUrl: string;
    timeout: {
        default: number;
        navigation: number;
        action: number;
    };
    credentials: {
        username: string;
        password: string;
    };
    features: {
        enableTracing: boolean;
        enableScreenshot: boolean;
        enableVideo: boolean;
    };
}

/**
 * Konfigurasi untuk Development Environment
 */
const devConfig: AppConfig = {
    name: Environment.DEV,
    baseUrl: process.env.DEV_BASE_URL || 'http://localhost:3000',
    apiBaseUrl: process.env.DEV_API_BASE_URL || 'http://localhost:3000/api',
    timeout: {
        default: 30000,
        navigation: 30000,
        action: 10000,
    },
    credentials: {
        username: process.env.DEV_USERNAME || 'devuser@example.com',
        password: process.env.DEV_PASSWORD || 'DevPass123!',
    },
    features: {
        enableTracing: true,
        enableScreenshot: true,
        enableVideo: true,
    },
};

/**
 * Konfigurasi untuk Staging Environment
 */
const stagingConfig: AppConfig = {
    name: Environment.STAGING,
    baseUrl: process.env.STAGING_BASE_URL || 'https://staging.example.com',
    apiBaseUrl: process.env.STAGING_API_BASE_URL || 'https://staging.example.com/api',
    timeout: {
        default: 30000,
        navigation: 30000,
        action: 10000,
    },
    credentials: {
        username: process.env.STAGING_USERNAME || 'staginguser@example.com',
        password: process.env.STAGING_PASSWORD || 'StagingPass123!',
    },
    features: {
        enableTracing: true,
        enableScreenshot: true,
        enableVideo: true,
    },
};

/**
 * Konfigurasi untuk Production Environment
 */
const prodConfig: AppConfig = {
    name: Environment.PROD,
    baseUrl: process.env.PROD_BASE_URL || 'https://example.com',
    apiBaseUrl: process.env.PROD_API_BASE_URL || 'https://example.com/api',
    timeout: {
        default: 30000,
        navigation: 30000,
        action: 10000,
    },
    credentials: {
        username: process.env.PROD_USERNAME || 'produser@example.com',
        password: process.env.PROD_PASSWORD || 'ProdPass123!',
    },
    features: {
        enableTracing: false,
        enableScreenshot: false,
        enableVideo: false,
    },
};

/**
 * Get current environment from environment variable
 */
export const getCurrentEnvironment = (): Environment => {
    const env = process.env.NODE_ENV || process.env.ENV || Environment.DEV;
    return Object.values(Environment).includes(env as Environment)
        ? (env as Environment)
        : Environment.DEV;
};

/**
 * Get configuration for current environment
 */
export const getConfig = (): AppConfig => {
    const env = getCurrentEnvironment();

    switch (env) {
        case Environment.STAGING:
            return stagingConfig;
        case Environment.PROD:
            return prodConfig;
        case Environment.DEV:
        default:
            return devConfig;
    }
};

/**
 * Export singleton config instance
 */
export const config = getConfig();
