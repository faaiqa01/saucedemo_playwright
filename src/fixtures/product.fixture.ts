/**
 * Product Fixture
 *
 * Test data untuk product-related tests.
 * Data terpisah dari kode test sesuai SOUL.md best practices.
 */

/**
 * Interface untuk Product data
 */
export interface ProductData {
    name: string;
    description: string;
    price: string;
    priceValue: number;
}

/**
 * All available products in Saucedemo
 */
export const products: ProductData[] = [
    {
        name: 'Sauce Labs Backpack',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        price: '$29.99',
        priceValue: 29.99,
    },
    {
        name: 'Sauce Labs Bike Light',
        description: 'A red light isn\'t the worst thing, isn\'t it? Now you won\'t get stuck in the dark.',
        price: '$9.99',
        priceValue: 9.99,
    },
    {
        name: 'Sauce Labs Bolt T-Shirt',
        description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
        price: '$15.99',
        priceValue: 15.99,
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
        price: '$49.99',
        priceValue: 49.99,
    },
    {
        name: 'Sauce Labs Onesie',
        description: 'Rib snap infant onesie for the junior in your life. Reinforced 3-snap bottom closure on two-needle hemmed sleeved and bottom won\'t unravel.',
        price: '$7.99',
        priceValue: 7.99,
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
        price: '$15.99',
        priceValue: 15.99,
    },
];

/**
 * Get product by name
 * @param name - Product name
 */
export const getProductByName = (name: string): ProductData | undefined => {
    return products.find(product => product.name === name);
};

/**
 * Get product by index
 * @param index - Product index (0-based)
 */
export const getProductByIndex = (index: number): ProductData | undefined => {
    return products[index];
};

/**
 * Get first product
 */
export const getFirstProduct = (): ProductData => {
    return products[0];
};

/**
 * Get last product
 */
export const getLastProduct = (): ProductData => {
    return products[products.length - 1];
};

/**
 * Get cheapest product
 */
export const getCheapestProduct = (): ProductData => {
    return [...products].sort((a, b) => a.priceValue - b.priceValue)[0];
};

/**
 * Get most expensive product
 */
export const getMostExpensiveProduct = (): ProductData => {
    return [...products].sort((a, b) => b.priceValue - a.priceValue)[0];
};

/**
 * Get products sorted by name (A to Z)
 */
export const getProductsSortedByNameAZ = (): ProductData[] => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get products sorted by name (Z to A)
 */
export const getProductsSortedByNameZA = (): ProductData[] => {
    return [...products].sort((a, b) => b.name.localeCompare(a.name));
};

/**
 * Get products sorted by price (low to high)
 */
export const getProductsSortedByPriceLowToHigh = (): ProductData[] => {
    return [...products].sort((a, b) => a.priceValue - b.priceValue);
};

/**
 * Get products sorted by price (high to low)
 */
export const getProductsSortedByPriceHighToLow = (): ProductData[] => {
    return [...products].sort((a, b) => b.priceValue - a.priceValue);
};

/**
 * Sort options for dropdown
 */
export const SortOptions = {
    NAME_AZ: 'az',
    NAME_ZA: 'za',
    PRICE_LOW_TO_HIGH: 'lohi',
    PRICE_HIGH_TO_LOW: 'hilo',
} as const;

export type SortOption = typeof SortOptions[keyof typeof SortOptions];
