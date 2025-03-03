import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_TITLE } from '../app.token';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';
import { SelectProductKeyComponent } from './select-product-key/select-product-key.component';
import { SelectProductKey } from './select-product-key/select-product-key.types';
import { SortProductsPipe } from './sort-products/sort-products.pipe';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  imports: [CurrencyPipe, RouterLink, ProductComponent, SelectProductKeyComponent, SortProductsPipe],
})
export class CatalogComponent {
  private catalogService = inject(CatalogService);

  private basketService = inject(BasketService);

  appTitle = inject(APP_TITLE);

  products = this.catalogService.products;

  hasProductsInStock = this.catalogService.hasProductsInStock;

  total = this.basketService.total;

  productKey = signal<SelectProductKey>(undefined);

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => this.catalogService.decreaseStock(id));
  }
}
