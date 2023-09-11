import { BehaviorSubject, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items$ = new BehaviorSubject<BasketItem[]>([]);

  total$ = new BehaviorSubject(0);

  dispatchItems(): Observable<void> {
    return of(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem(productId: string): Observable<void> {
    return of(undefined);
  }
}
