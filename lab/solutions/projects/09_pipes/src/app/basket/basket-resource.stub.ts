import { Injectable, signal } from '@angular/core';
import { BasketResource } from './basket-resource';
import { BasketItem } from './basket-types';

@Injectable()
export class BasketResourceStub implements Partial<BasketResource> {
  items = signal<BasketItem[]>([]);

  total = signal(0);

  addItem(item: BasketItem): void {
    this.items.update((items) => [...items, item]);
  }
}
