import { Injectable } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
                this.products = products.map(product => {
                  product.title = this.uppercase.transform(product.title);
                  return product;
                });
                return this.products;
                
              })
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
