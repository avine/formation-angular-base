import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [CurrencyPipe, NgClass, UpperCasePipe, RouterLink],
})
export class ProductComponent {
  readonly product = input.required<Product>();

  readonly addToBasket = output<Product>();

  protected onClick() {
    this.addToBasket.emit(this.product());
  }
}
