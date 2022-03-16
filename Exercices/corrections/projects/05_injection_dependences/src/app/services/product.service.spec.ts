import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Product } from '../model/product';

describe('ProductService', () => {
  let service: ProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ProductService],
    }).compileComponents();
    service = TestBed.inject(ProductService);
  });

  it('should be created with 4 products', () => {
    expect(service).toBeTruthy();
    expect(service.getProducts().length).toBe(4);
  });

  [
    { stock: 0, isTheLast: false },
    { stock: 1, isTheLast: true },
    { stock: 2, isTheLast: false },
    { stock: 100, isTheLast: false },
  ].forEach(({ stock, isTheLast }) =>
    it(`should isTheLast return ${isTheLast} if stock is ${stock}`, () => {
      const product = new Product('', '', '', 0, stock);
      expect(service.isTheLast(product)).toBe(isTheLast);
    })
  );

  [
    { stock: 0, isAvailable: false },
    { stock: 1, isAvailable: true },
    { stock: 2, isAvailable: true },
    { stock: 100, isAvailable: true },
  ].forEach(({ stock, isAvailable }) =>
    it(`should isAvailable return ${isAvailable} if stock is ${stock}`, () => {
      const product = new Product('', '', '', 0, stock);
      expect(service.isAvailable(product)).toBe(isAvailable);
    })
  );

  it('should decreaseStock decrease product stock of 1', () => {
    const product = new Product('', '', '', 0, 42);
    service.decreaseStock(product);
    expect(product.stock).toBe(42 - 1);
  });
});
