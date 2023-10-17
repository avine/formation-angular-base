import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items?: BasketItem[];

  get items(): BasketItem[] | undefined {
    return this._items;
  }

  get total(): number | undefined {
    return this._items?.reduce((total, { price }) => total + price, 0);
  }

  constructor(private httpClient: HttpClient) {}

  /**
   *  @param refresh Fetch the items from the API server even if they have already been fetched and stored in the service
   */
  fetchItems(refresh = false) {
    if (!refresh && this._items) {
      return of(this._items);
    }
    return this.httpClient
      .get<BasketItem[]>('http://localhost:8080/api/basket')
      .pipe(tap((items) => (this._items = items)));
  }

  addItem(productId: string) {
    return this.httpClient.post<BasketItem>('http://localhost:8080/api/basket', { productId }).pipe(
      tap((item) => {
        this._items ??= [];
        this._items.push(item);
      }),
    );
  }
}
