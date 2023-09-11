import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { BasketItem } from '../../basket/basket.types';
import { CheckoutDetails } from '../../checkout-form/checkout-form.types';
import { Product } from '../../product/product.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiUrlBase}/products`);
  }

  fetchProduct(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiUrlBase}/products/${productId}`);
  }

  fetchBasket(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(`${environment.apiUrlBase}/basket`);
  }

  addToBasket(productId: string): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(`${environment.apiUrlBase}/basket`, { productId });
  }

  checkoutBasket(checkoutDetails: CheckoutDetails): Observable<{ orderNumber: number }> {
    return this.httpClient.post<{ orderNumber: number }>(`${environment.apiUrlBase}/basket/checkout`, checkoutDetails);
  }
}
