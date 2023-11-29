import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../product/product.types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _products: Product[] = [];

  get products(): Product[] {
    return this._products;
  }

  get hasProductsInStock(): boolean {
    return this._products.some(({ stock }) => stock > 0);
  }

  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8080/api/products')
      .pipe(tap((products) => (this._products = products)));
  }

  decreaseStock(productId: string): boolean {
    const product = (this._products ?? []).find(({ id }) => id === productId);
    if (!product || product.stock < 1) {
      return false;
    }
    product.stock -= 1;
    return true;
  }
}
