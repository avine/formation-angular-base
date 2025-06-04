import { Component, inject } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketResource } from './basket/basket-resource';
import { CatalogResource } from './catalog/catalog-resource';
import { Menu } from './menu/menu';
import { ProductCard } from './product-card/product-card';
import { Product } from './product-card/product-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Menu, ProductCard],
})
export class App {
  private catalogResource = inject(CatalogResource);

  private basketResource = inject(BasketResource);

  appTitle = inject(APP_TITLE);

  products = this.catalogResource.products;

  hasProductsInStock = this.catalogResource.hasProductsInStock;

  total = this.basketResource.total;

  addToBasket({ id, title, price }: Product) {
    this.basketResource.addItem({ id, title, price });
    this.catalogResource.decreaseStock(id);
  }
}
