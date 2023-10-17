import { Injectable } from '@angular/core';
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

  addItem(item: BasketItem): void {
    this._items.push(item);
  }
}
