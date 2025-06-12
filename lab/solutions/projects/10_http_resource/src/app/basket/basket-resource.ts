import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BasketItem } from './basket-types';

@Injectable({
  providedIn: 'root',
})
export class BasketResource {
  private httpClient = inject(HttpClient);

  private _items = httpResource<BasketItem[]>(() => 'http://localhost:8080/api/basket');

  items = this._items.asReadonly().value;

  total = computed(() => this._items.value()?.reduce((total, { price }) => total + price, 0));

  addItem(productId: string): Observable<BasketItem> {
    return this.httpClient
      .post<BasketItem>('http://localhost:8080/api/basket', { productId })
      .pipe(tap((item) => this._items.update((items) => [...(items ?? []), item])));
  }
}
