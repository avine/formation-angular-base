import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Output()
  addToBasket = new EventEmitter<Product>();

  @Input()
  data!: Product;

  addToBasketClick() {
    this.addToBasket.emit(this.data);
  }
}
