/**
 * Checkout Fixture
 * 
 * Test data untuk checkout-related tests.
 * Data terpisah dari kode test sesuai SOUL.md best practices.
 */

/**
 * Interface untuk Checkout Information data
 */
export interface CheckoutInfoData {
    firstName: string;
    lastName: string;
    postalCode: string;
    description: string;
}

/**
 * Valid checkout information fixture
 */
export const validCheckoutInfo: CheckoutInfoData = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    description: 'Valid checkout information',
};

/**
 * Checkout information with empty first name
 */
export const checkoutInfoEmptyFirstName: CheckoutInfoData = {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
    description: 'Checkout information with empty first name',
};

/**
 * Checkout information with empty last name
 */
export const checkoutInfoEmptyLastName: CheckoutInfoData = {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
    description: 'Checkout information with empty last name',
};

/**
 * Checkout information with empty postal code
 */
export const checkoutInfoEmptyPostalCode: CheckoutInfoData = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
    description: 'Checkout information with empty postal code',
};

/**
 * Checkout information with all empty fields
 */
export const checkoutInfoAllEmpty: CheckoutInfoData = {
    firstName: '',
    lastName: '',
    postalCode: '',
    description: 'Checkout information with all empty fields',
};

/**
 * Checkout information with invalid postal code (letters)
 */
export const checkoutInfoInvalidPostalCodeLetters: CheckoutInfoData = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: 'ABCDE',
    description: 'Checkout information with invalid postal code (letters)',
};

/**
 * Checkout information with invalid postal code (special characters)
 */
export const checkoutInfoInvalidPostalCodeSpecial: CheckoutInfoData = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12@#$',
    description: 'Checkout information with invalid postal code (special characters)',
};

/**
 * Checkout information with long values
 */
export const checkoutInfoLongValues: CheckoutInfoData = {
    firstName: 'Johnathan Christopher Maximilian',
    lastName: 'Robertson Williamson Alexander',
    postalCode: '1234567890',
    description: 'Checkout information with long values',
};

/**
 * Checkout information with special characters in name
 */
export const checkoutInfoSpecialChars: CheckoutInfoData = {
    firstName: 'José María',
    lastName: "O'Connor",
    postalCode: '12345',
    description: 'Checkout information with special characters in name',
};

/**
 * Get checkout info fixture by type
 */
export const getCheckoutInfoFixture = (
    type: 'valid' | 'emptyFirstName' | 'emptyLastName' | 'emptyPostalCode' | 'allEmpty' | 
          'invalidPostalCodeLetters' | 'invalidPostalCodeSpecial' | 'longValues' | 'specialChars'
): CheckoutInfoData => {
    switch (type) {
        case 'emptyFirstName':
            return checkoutInfoEmptyFirstName;
        case 'emptyLastName':
            return checkoutInfoEmptyLastName;
        case 'emptyPostalCode':
            return checkoutInfoEmptyPostalCode;
        case 'allEmpty':
            return checkoutInfoAllEmpty;
        case 'invalidPostalCodeLetters':
            return checkoutInfoInvalidPostalCodeLetters;
        case 'invalidPostalCodeSpecial':
            return checkoutInfoInvalidPostalCodeSpecial;
        case 'longValues':
            return checkoutInfoLongValues;
        case 'specialChars':
            return checkoutInfoSpecialChars;
        case 'valid':
        default:
            return validCheckoutInfo;
    }
};

/**
 * Error messages untuk checkout information
 */
export const CheckoutErrorMessages = {
    FIRST_NAME_REQUIRED: 'Error: First Name is required',
    LAST_NAME_REQUIRED: 'Error: Last Name is required',
    POSTAL_CODE_REQUIRED: 'Error: Postal Code is required',
    ALL_FIELDS_REQUIRED: 'Error: First Name is required',
};

/**
 * Success messages untuk checkout complete
 */
export const CheckoutSuccessMessages = {
    THANK_YOU: 'Thank you for your order!',
    ORDER_DISPATCHED: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    COMPLETE_TITLE: 'Checkout: Complete!',
};

/**
 * Page titles untuk checkout flow
 */
export const CheckoutPageTitles = {
    CART: 'Your Cart',
    CHECKOUT_INFO: 'Checkout: Your Information',
    CHECKOUT_OVERVIEW: 'Checkout: Overview',
    CHECKOUT_COMPLETE: 'Checkout: Complete!',
};

/**
 * Payment information values
 */
export const PaymentInfo = {
    SNEAKER_RANCH: 'Sneaker Ranch Support',
    PONY_EXPRESS: 'Pony Express',
};

/**
 * Shipping information values
 */
export const ShippingInfo = {
    FREE_PONY: 'Free Pony Express Delivery!',
};
