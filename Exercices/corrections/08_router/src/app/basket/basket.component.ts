import { Component, OnInit } from '@angular/core';

import { Product } from '../model/product';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: Product[];

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customerService.getBasket().subscribe(products => this.basket = products);
  }
}
