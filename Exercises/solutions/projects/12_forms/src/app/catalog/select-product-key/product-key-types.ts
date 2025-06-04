import { Product } from '../product-card/product-types';

export type ProductKey = keyof Pick<Product, 'price' | 'stock'> | undefined;
