import { Product } from '../product/product-types';

export type ProductKey = keyof Pick<Product, 'price' | 'stock'> | undefined;
