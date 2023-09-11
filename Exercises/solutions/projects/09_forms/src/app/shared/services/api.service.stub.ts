import { Observable, delay, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { BasketItem } from '../../basket/basket.types';
import { Product } from '../../product/product.types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiStubService implements Partial<ApiService> {
  fetchProducts(): Observable<Product[]> {
    return of([
      { id: 'ID_1', title: 'TITLE_1', description: 'DESC_1', photo: 'PHOTO_1', price: 3, stock: 2 },
      { id: 'ID_2', title: 'TITLE_2', description: 'DESC_2', photo: 'PHOTO_2', price: 2, stock: 1 },
      { id: 'ID_3', title: 'TITLE_3', description: 'DESC_3', photo: 'PHOTO_3', price: 1, stock: 0 },
    ]).pipe(delay(0));
  }

  fetchProduct(productId: string): Observable<Product> {
    return of({ id: productId, title: 'TITLE', description: 'DESC', photo: 'PHOTO', price: 3, stock: 2 });
  }

  fetchBasket(): Observable<BasketItem[]> {
    return of([]);
  }

  addToBasket(productId: string): Observable<BasketItem> {
    return of({ id: productId, title: 'TITLE', price: 3 });
  }
}
