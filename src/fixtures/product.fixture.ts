/**
 * Product Fixture
 * 
 * Test data untuk product-related tests.
 */

/**
 * Interface untuk Product data
 */
export interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
}

/**
 * Sample product fixture
 */
export const sampleProduct: ProductData = {
    id: 'prod-001',
    name: 'Sample Product',
    description: 'This is a sample product for testing purposes',
    price: 99.99,
    category: 'Electronics',
    stock: 100,
    imageUrl: 'https://example.com/images/sample-product.jpg',
};

/**
 * Product dengan stock kosong
 */
export const outOfStockProduct: ProductData = {
    id: 'prod-002',
    name: 'Out of Stock Product',
    description: 'This product is currently out of stock',
    price: 149.99,
    category: 'Electronics',
    stock: 0,
    imageUrl: 'https://example.com/images/out-of-stock.jpg',
};

/**
 * Product dengan harga tinggi
 */
export const expensiveProduct: ProductData = {
    id: 'prod-003',
    name: 'Premium Product',
    description: 'Premium quality product with high price',
    price: 999.99,
    category: 'Premium',
    stock: 10,
    imageUrl: 'https://example.com/images/premium-product.jpg',
};

/**
 * Product dengan harga rendah
 */
export const budgetProduct: ProductData = {
    id: 'prod-004',
    name: 'Budget Product',
    description: 'Affordable product for budget-conscious buyers',
    price: 9.99,
    category: 'Budget',
    stock: 500,
    imageUrl: 'https://example.com/images/budget-product.jpg',
};

/**
 * Generate random product
 */
export const generateRandomProduct = (): ProductData => {
    const timestamp = Date.now();
    return {
        id: `prod-${timestamp}`,
        name: `Product ${timestamp}`,
        description: `Description for product ${timestamp}`,
        price: Math.floor(Math.random() * 1000) + 1,
        category: 'Test Category',
        stock: Math.floor(Math.random() * 100),
        imageUrl: `https://example.com/images/product-${timestamp}.jpg`,
    };
};

/**
 * Get product fixture berdasarkan type
 */
export const getProductFixture = (type: 'sample' | 'outOfStock' | 'expensive' | 'budget'): ProductData => {
    switch (type) {
        case 'outOfStock':
            return outOfStockProduct;
        case 'expensive':
            return expensiveProduct;
        case 'budget':
            return budgetProduct;
        case 'sample':
        default:
            return sampleProduct;
    }
};
