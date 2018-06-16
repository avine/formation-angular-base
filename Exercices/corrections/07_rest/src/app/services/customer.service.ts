import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API_URL = 'http://localhost:8080/rest/';

  products: Product[] = new Array<Product>();

  constructor(
    private http: HttpClient
  ) {}

  getBasket(): Observable<Product[]> {
    return this.http.get(this.API_URL + 'basket')
      .pipe(
        map((products: any[]) => {
          return products.map(product => {
            return new Product(product.title, product.description, product.photo, product.price, product.stock);
          });
        }),
        tap(products => this.products = products)
      );
 }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.API_URL + 'basket', product)
      .pipe(tap(() => this.products.push(product)));
  }

  getTotal(): number {
    return this.products.reduce((previous, next) => previous + next.price, 0);
  }

}
