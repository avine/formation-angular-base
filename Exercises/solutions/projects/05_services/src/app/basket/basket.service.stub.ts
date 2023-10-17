import { Injectable } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items: BasketItem[] = [];

  total = 0;

  addItem(item: BasketItem): void {
    this.items.push(item);
  }
}
