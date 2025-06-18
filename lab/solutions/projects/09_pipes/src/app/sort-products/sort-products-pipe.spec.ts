import { Product } from '../product/product-types';
import { SortProductsPipe } from './sort-products-pipe';

describe('SortProductsPipe', () => {
  let pipe: SortProductsPipe;
  let products: Product[];

  beforeEach(() => {
    pipe = new SortProductsPipe();
    products = [
      { stock: 30, price: 1 } as Product,
      { stock: 10, price: 3 } as Product,
      { stock: 20, price: 2 } as Product,
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should accept null or undefined', () => {
    expect(pipe.transform(null)).toEqual([]);
    expect(pipe.transform(undefined)).toEqual([]);
  });

  it('should not sort products when key undefined', () => {
    expect(pipe.transform(products)).toEqual(products);
  });

  it('should sort products by price', () => {
    const sortedProducts: Product[] = [
      { stock: 30, price: 1 } as Product,
      { stock: 20, price: 2 } as Product,
      { stock: 10, price: 3 } as Product,
    ];
    expect(pipe.transform(products, 'price')).toEqual(sortedProducts);
  });

  it('should sort products by stock', () => {
    const sortedProducts: Product[] = [
      { stock: 10, price: 3 } as Product,
      { stock: 20, price: 2 } as Product,
      { stock: 30, price: 1 } as Product,
    ];
    expect(pipe.transform(products, 'stock')).toEqual(sortedProducts);
  });
});
