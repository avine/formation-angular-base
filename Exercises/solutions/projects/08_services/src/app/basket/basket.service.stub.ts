import { Injectable, signal } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items = signal<BasketItem[]>([]);

  total = signal(0);

  addItem(item: BasketItem): void {
    this.items.update((items) => [...items, item]);
  }
}
