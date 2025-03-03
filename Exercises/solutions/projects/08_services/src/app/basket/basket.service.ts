import { computed, Injectable, signal } from '@angular/core';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items = signal<BasketItem[]>([]);

  items = this._items.asReadonly();

  total = computed<number>(() => this._items().reduce((total, { price }) => total + price, 0));

  addItem(item: BasketItem): void {
    this._items.update((items) => [...items, item]);
  }
}
