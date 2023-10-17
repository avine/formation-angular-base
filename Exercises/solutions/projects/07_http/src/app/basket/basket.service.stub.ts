import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items: BasketItem[] = [];

  total = 0;

  fetchItems() {
    return of([] as BasketItem[]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem(productId: string) {
    return of({ id: productId, title: 'TITLE', price: 1 } as BasketItem);
  }
}
