import { Component, Inject, OnInit } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { Product } from './product/product.types';
import { SelectProductKey } from './select-product-key/select-product-key.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  get products() {
    return this.catalogService.products;
  }

  get hasProductsInStock() {
    return this.catalogService.hasProductsInStock;
  }

  get total() {
    return this.basketService.total;
  }

  productKey: SelectProductKey = undefined;

  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    @Inject(APP_TITLE) public appTitle: string,
  ) {}

  ngOnInit(): void {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => {
      this.catalogService.decreaseStock(id);
    });
  }

  trackByProductId(_: number, { id }: Product) {
    return id;
  }
}
