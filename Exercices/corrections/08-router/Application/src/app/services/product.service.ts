import { Injectable } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Product } from '../model/product';

@Injectable()
export class ProductService {

  private products: Product[];

  private API_URL: string = "http://localhost:8080/rest/";

  constructor(private uppercase:UpperCasePipe, private http:Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.API_URL + 'products')
              .map(res => res.json())
              .map(products => {
                return products.map(product => new Product(product.title, product.description, product.photo, product.price, product.stock));
              })
              .map(products => {
                return products.map(product => {
                  product.title = this.uppercase.transform(product.title);
                  return product;
                });
              })
              .do(products => this.products = products);
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
