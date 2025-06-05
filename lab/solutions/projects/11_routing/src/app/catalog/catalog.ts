import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_TITLE } from '../app.token';
import { BasketResource } from '../basket/basket-resource';
import { CatalogResource } from './catalog-resource';
import { ProductCard } from './product/product-card';
import { Product } from './product/product-types';
import { ProductKey } from './select-product-key/product-key-types';
import { SelectProductKey } from './select-product-key/select-product-key';
import { SortProductsPipe } from './sort-products/sort-products-pipe';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  imports: [CurrencyPipe, RouterLink, ProductCard, SelectProductKey, SortProductsPipe],
})
export class Catalog {
  private catalogService = inject(CatalogResource);

  private basketService = inject(BasketResource);

  appTitle = inject(APP_TITLE);

  products = this.catalogService.products;

  hasProductsInStock = this.catalogService.hasProductsInStock;

  total = this.basketService.total;

  productKey = signal<ProductKey>(undefined);

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => this.catalogService.decreaseStock(id));
  }
}
