import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../model/product';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Product[];

  constructor(private customerService: CustomerService, private router: Router) { 
    customerService.getBasket().subscribe(products => this.basket = products);
  }

  ngOnInit() {
  }

}
