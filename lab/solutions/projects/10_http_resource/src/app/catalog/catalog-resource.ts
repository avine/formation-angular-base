import { httpResource } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { Product } from '../product/product-types';

@Injectable({
  providedIn: 'root',
})
export class CatalogResource {
  private _products = httpResource<Product[]>(() => 'http://localhost:8080/api/products');

  products = this._products.value;

  productsInStock = computed(() => this._products.value()?.filter(({ stock }) => stock > 0));

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
