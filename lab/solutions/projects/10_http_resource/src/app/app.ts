import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketResource } from './basket/basket-resource';
import { CatalogResource } from './catalog/catalog-resource';
import { HighlightPrice } from './highlight-price/highlight-price';
import { Menu } from './menu/menu';
import { ProductCard } from './product/product-card';
import { Product } from './product/product-types';
import { ProductKey } from './select-product-key/product-key-types';
import { SelectProductKey } from './select-product-key/select-product-key';
import { SortProductsPipe } from './sort-products/sort-products-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [CurrencyPipe, HighlightPrice, Menu, ProductCard, SelectProductKey, SortProductsPipe],
})
export class App {
  private catalogResource = inject(CatalogResource);

  private basketResource = inject(BasketResource);

  appTitle = inject(APP_TITLE);

  productsInStock = this.catalogResource.productsInStock;

  total = this.basketResource.total;

  productKey = signal<ProductKey>(undefined);

  addToBasket({ id }: Product) {
    this.basketResource.addItem(id).subscribe(() => this.catalogResource.decreaseStock(id));
  }
}
