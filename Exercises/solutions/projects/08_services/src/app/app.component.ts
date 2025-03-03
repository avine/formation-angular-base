import { Component, inject } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [MenuComponent, ProductComponent],
})
export class AppComponent {
  private catalogService = inject(CatalogService);

  private basketService = inject(BasketService);

  appTitle = inject(APP_TITLE);

  products = this.catalogService.products;

  hasProductsInStock = this.catalogService.hasProductsInStock;

  total = this.basketService.total;

  addToBasket({ id, title, price }: Product) {
    this.basketService.addItem({ id, title, price });
    this.catalogService.decreaseStock(id);
  }
}
