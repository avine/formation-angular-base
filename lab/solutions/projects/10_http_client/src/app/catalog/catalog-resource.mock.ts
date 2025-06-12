import { computed, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../product/product-types';
import { CatalogResource } from './catalog-resource';

@Injectable()
export class CatalogResourceMock implements Partial<CatalogResource> {
  products = signal<Product[]>([
    { id: 'ID_1', title: 'TITLE_1', description: 'DESC_1', photo: 'PHOTO_1', price: 3, stock: 2 },
    { id: 'ID_2', title: 'TITLE_2', description: 'DESC_2', photo: 'PHOTO_2', price: 2, stock: 1 },
    { id: 'ID_3', title: 'TITLE_3', description: 'DESC_3', photo: 'PHOTO_3', price: 1, stock: 0 },
  ]);

  productsInStock = computed<Product[]>(() => this.products().filter(({ stock }) => stock > 0));

  fetchProducts(): Observable<Product[]> {
    return of(this.products());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  decreaseStock(productId: string) {}
}
