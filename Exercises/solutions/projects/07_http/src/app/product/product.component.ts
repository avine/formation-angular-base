import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();

  protected onClick() {
    this.addToBasket.emit(this.product);
  }
}
