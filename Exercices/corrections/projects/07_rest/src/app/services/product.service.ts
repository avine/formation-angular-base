import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:8080/rest/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + 'products').pipe(
      map((products) => {
        return products.map((product) => {
          return new Product(product.title, product.description, product.photo, product.price, product.stock);
        });
      })
    );
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
