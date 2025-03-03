import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [NgClass, CurrencyPipe, UpperCasePipe],
})
export class ProductComponent {
  readonly product = input.required<Product>();

  readonly addToBasket = output<Product>();

  protected onClick() {
    this.addToBasket.emit(this.product());
  }
}
