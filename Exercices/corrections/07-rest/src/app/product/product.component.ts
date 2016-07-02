import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Product} from '../model/product.model'

@Component({
  moduleId: module.id,
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  data:Product;

  @Output()
  addToBasket:EventEmitter<Product> = new EventEmitter<Product>();

  constructor() {}


  addToBasketClick(){
    this.addToBasket.emit(this.data);
  }

  ngOnInit() {
  }

}
