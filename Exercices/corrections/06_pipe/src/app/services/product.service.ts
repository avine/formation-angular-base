import { Injectable } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { Product } from '../model/product';

@Injectable()
export class ProductService {

  private products: Product[] = [
    new Product('Product1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 10, 2),
    new Product('Product2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 20, 2),
    new Product('Product3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 30, 2),
    new Product('Product4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 40, 2)
  ];

  constructor(uppercase: UpperCasePipe) {
    this.products = this.products.map(p => {
      p.title = uppercase.transform(p.title);
      return p;
    });
  }

  getProducts(): Product[] {
    return this.products;
  }

  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  decreaseStock(product: Product) {
    product.stock -= 1;
  }

}
