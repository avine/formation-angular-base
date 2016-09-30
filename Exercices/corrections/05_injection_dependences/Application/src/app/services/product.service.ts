import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable()
export class ProductService {

  private products: Product[];

  constructor() {
    this.products = new Array<Product>();

    this.products.push(new Product('Product 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 10, 2));
    this.products.push(new Product('Product 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 20, 2));
    this.products.push(new Product('Product 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 30, 2));
    this.products.push(new Product('Product 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'http://placehold.it/800x500', 40, 2));
  }

  getProducts(): Product[] {
    return this.products;
  }

  isTheLast(title: string): boolean {
    return this.products.find((product) => { return product.title === title }).stock === 1;
  }

  isAvailable(title: string): boolean {
    return this.products.find((product) => { return product.title === title }).stock !== 0;
  }

  decreaseStock(title: string) {
    this.products.find((product) => { return product.title === title }).stock -= 1;
  }
}
