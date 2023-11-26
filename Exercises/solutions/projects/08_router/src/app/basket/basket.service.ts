import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items: BasketItem[] = [];

  get items(): BasketItem[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((total, { price }) => total + price, 0);
  }

  constructor(private httpClient: HttpClient) {}

  fetchBasket(): Observable<BasketItem[]> {
    return this.httpClient
      .get<BasketItem[]>('http://localhost:8080/api/basket')
      .pipe(tap((items) => (this._items = items)));
  }

  addItem(productId: string) {
    return this.httpClient
      .post<BasketItem>('http://localhost:8080/api/basket', { productId })
      .pipe(tap((item) => this._items.push(item)));
  }
}
