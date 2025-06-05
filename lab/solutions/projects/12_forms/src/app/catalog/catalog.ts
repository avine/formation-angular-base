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
  private catalogResource = inject(CatalogResource);

  private basketResource = inject(BasketResource);

  appTitle = inject(APP_TITLE);

  products = this.catalogResource.products;

  hasProductsInStock = this.catalogResource.hasProductsInStock;

  total = this.basketResource.total;

  productKey = signal<ProductKey>(undefined);

  constructor() {
    this.catalogResource.fetchProducts().subscribe();
    this.basketResource.fetchBasket().subscribe();
  }

  addToBasket({ id }: Product) {
    this.basketResource.addItem(id).subscribe(() => this.catalogResource.decreaseStock(id));
  }
}
