import { Component, OnInit } from '@angular/core';
import { CustomerService }  from '../service/customer.service';
import { Product } from '../model/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Product[];

  constructor(private customerService:CustomerService) {
    customerService.getBasket()
      .subscribe(basket => this.basket = basket);
  }

  ngOnInit() {
  }

}
