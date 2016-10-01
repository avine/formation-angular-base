import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs';

import { Product } from '../model/product';


@Injectable()
export class CustomerService {

  private API_URL: string = "http://localhost:8080/rest/";

  public products: Product[] = new Array<Product>();
  
  constructor(private http:Http){}

  getBasket(): Observable<Product[]>{
    return this.http.get(this.API_URL + 'basket')
                  .map(res => res.json())
                  .map(products => {
                    this.products = products
                    return this.products;  
                  })
 }

  addProduct(product: Product): Observable<Product> {
    let headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.API_URL + 'basket', JSON.stringify(product), {headers})
                  .map(products => {
                    this.products.push(product);
                    return product;
                  })
    
  }

  getTotal(): number {
    return this.products.reduce((previous, next) => previous + next.price, 0);
  }

}
