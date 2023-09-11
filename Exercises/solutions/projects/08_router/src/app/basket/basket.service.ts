import { map, Observable, of, ReplaySubject, tap } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  itemsSnapshot: BasketItem[] | undefined = undefined;

  // Let's use a `ReplaySubject` (look at the `CatalogService` to see the usage of `BehaviorSubject`)
  private _items$ = new ReplaySubject<BasketItem[]>(1);

  items$ = this._items$.asObservable();

  total$ = this._items$.pipe(map((items) => items.reduce((total, { price }) => total + price, 0)));

  constructor(private apiService: ApiService) {}

  /**
   *  @param refresh Fetch the items from the API server even if they have already been fetched and stored in the service
   */
  dispatchItems(refresh = false): Observable<void> {
    if (!refresh && this.itemsSnapshot) {
      return of(undefined);
    }
    return this.apiService.fetchBasket().pipe(
      tap((items) => {
        this.itemsSnapshot = items;
        this._items$.next(this.itemsSnapshot);
      }),
      map(() => undefined),
    );
  }

  addItem(productId: string): Observable<void> {
    return this.apiService.addToBasket(productId).pipe(
      tap((item) => {
        this.itemsSnapshot = [...(this.itemsSnapshot ?? []), item];
        this._items$.next(this.itemsSnapshot);
      }),
      map(() => undefined),
    );
  }
}
