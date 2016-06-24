import { Injectable } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { Product } from '../model/product.model';

@Injectable()
export class ProductService {

  private products: Product[];

  constructor(uppercase: UpperCasePipe) {
    this.products = new Array<Product>();

    this.products.push(new Product('Product 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 10, 2));
    this.products.push(new Product('Product 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 20, 2));
    this.products.push(new Product('Product 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 30, 2));
    this.products.push(new Product('Product 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 40, 2));

    this.products = this.products.map(function (product) {
      product.title = uppercase.transform(product.title);
      return product;
    });

  }

  getProducts(): Product[] {
    return this.products;
  }

  isTheLast(title: string): boolean {
    return this.products.find((product) => { return product.title === title }).stock === 1;
  }

  isNotAvailable(title: string): boolean {
    return this.products.find((product) => { return product.title === title }).stock === 0;
  }

  decreaseStock(title: string) {
    this.products.find((product) => { return product.title === title }).stock -= 1;
  }
}
