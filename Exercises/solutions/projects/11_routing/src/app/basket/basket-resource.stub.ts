import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BasketResource } from './basket-resource';
import { BasketItem } from './basket-types';

@Injectable()
export class BasketResourceStub implements Partial<BasketResource> {
  items = signal<BasketItem[]>([]);

  total = signal(0);

  fetchBasket(): Observable<BasketItem[]> {
    return of(this.items());
  }

  addItem(productId: string): Observable<BasketItem> {
    return of({ id: productId, title: '', price: 0 });
  }
}
