import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product/product.types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private httpClient = inject(HttpClient);

  private _products = signal<Product[] | undefined>(undefined);

  products = this._products.asReadonly();

  hasProductsInStock = computed<boolean>(() => (this._products() ?? []).some(({ stock }) => stock > 0));

  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8080/api/products')
      .pipe(tap((products) => this._products.set(products)));
  }

  decreaseStock(productId: string) {
    this._products.update((products) =>
      (products ?? []).map((product) => {
        if (product.id === productId && product.stock > 0) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    );
  }
}
