import { SortProductsPipe } from './sort-products.pipe';

import { Product } from '../product/product.types';

describe('SortProductsPipe', () => {
  let pipe: SortProductsPipe;
  let products: Product[];

  beforeEach(() => {
    pipe = new SortProductsPipe();
    products = [
      { title: 'C', price: 1 } as Product,
      { title: 'A', price: 3 } as Product,
      { title: 'B', price: 2 } as Product,
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort products by price (default)', () => {
    const sortedProducts: Product[] = [
      { title: 'C', price: 1 } as Product,
      { title: 'B', price: 2 } as Product,
      { title: 'A', price: 3 } as Product,
    ];
    expect(pipe.transform(products)).toEqual(sortedProducts);
  });

  it('should sort products by title', () => {
    const sortedProducts: Product[] = [
      { title: 'A', price: 3 } as Product,
      { title: 'B', price: 2 } as Product,
      { title: 'C', price: 1 } as Product,
    ];
    expect(pipe.transform(products, 'title')).toEqual(sortedProducts);
  });
});
