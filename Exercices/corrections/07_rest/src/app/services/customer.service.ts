import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Product } from '../model/product';

@Injectable()
export class CustomerService {

  private API_URL = 'http://localhost:8080/rest/';

  products: Product[] = new Array<Product>();

  constructor(
    private http: Http
  ) {}

  getBasket(): Observable<Product[]> {
    return this.http.get(this.API_URL + 'basket')
      .map(response => response.json())
      .map(products => {
        return products.map(product => {
          return new Product(product.title, product.description, product.photo, product.price, product.stock);
        });
      })
      .do(products => this.products = products);
 }

  addProduct(product: Product): Observable<Response> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.API_URL + 'basket', JSON.stringify(product), {headers})
      .do(() => this.products.push(product));
  }

  getTotal(): number {
    return this.products.reduce((previous, next) => previous + next.price, 0);
  }

}
