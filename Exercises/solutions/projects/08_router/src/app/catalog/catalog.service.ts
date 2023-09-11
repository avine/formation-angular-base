import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

import { Injectable } from '@angular/core';

import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  // Let's use a `BehaviorSubject` (look at the `BasketService` to see the usage of `ReplaySubject`)
  private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);

  products$ = this._products$.asObservable();

  get productsSnapshot() {
    return this._products$.value;
  }

  hasProductsInStock$: Observable<boolean | undefined> = this._products$.pipe(
    map((products) => products?.some(({ stock }) => stock > 0) ?? undefined),
  );

  constructor(private apiService: ApiService) {}

  /**
   *  @param refresh Fetch the products from the API server even if they have already been fetched and stored in the service
   */
  dispatchProducts(refresh = false): Observable<void> {
    if (!refresh && this._products$.value) {
      return of(undefined);
    }
    return this.apiService.fetchProducts().pipe(
      tap((products) => this._products$.next(products)),
      map(() => undefined),
    );
  }

  decreaseStock(productId: string): boolean {
    let products = this._products$.value;
    if (!products) {
      return false;
    }

    products = structuredClone(products); // <-- for immutability

    const product = products.find(({ id }) => id === productId);
    if (!product || product.stock < 1) {
      return false;
    }
    product.stock -= 1;

    this._products$.next(products);
    return true;
  }
}
