import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Product } from '../product/product.types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _products?: Product[];

  get products(): Product[] | undefined {
    return this._products;
  }

  get hasProductsInStock(): boolean | undefined {
    return this._products?.some(({ stock }) => stock > 0);
  }

  constructor(private httpClient: HttpClient) {}

  /**
   *  @param refresh Fetch the products from the API server even if they have already been fetched and stored in the service
   */
  fetchProducts(refresh = false) {
    if (!refresh && this._products) {
      return of(this._products);
    }
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
