import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from './product-types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  imports: [NgClass, CurrencyPipe, UpperCasePipe],
})
export class ProductCard {
  readonly product = input.required<Product>();

  readonly addToBasket = output<Product>();

  protected onClick() {
    this.addToBasket.emit(this.product());
  }
}
