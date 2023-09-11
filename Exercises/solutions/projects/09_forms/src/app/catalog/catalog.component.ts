import { zip } from 'rxjs';

import { Component, Inject, OnInit } from '@angular/core';

import { APP_TITLE } from '../app.token';
import { BasketService } from '../basket/basket.service';
import { Product } from '../product/product.types';
import { SelectProductKey } from '../select-product-key/select-product-key.types';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  products$ = this.catalogService.products$;

  hasProductsInStock$ = this.catalogService.hasProductsInStock$;

  total$ = this.basketService.total$;

  productKey: SelectProductKey = 'price';

  hasError = false;

  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    @Inject(APP_TITLE) public appTitle: string,
  ) {}

  ngOnInit(): void {
    zip(this.catalogService.dispatchProducts(), this.basketService.dispatchItems()).subscribe({
      error: () => (this.hasError = true),
    });
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => this.catalogService.decreaseStock(id));
  }

  trackByProductId(_: number, { id }: Product) {
    return id;
  }
}
