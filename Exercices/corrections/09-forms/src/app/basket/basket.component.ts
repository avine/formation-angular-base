import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService }  from '../service/customer.service';
import { Product } from '../model/product.model';
import { Customer } from '../model/customer.model';

@Component({
  moduleId: module.id,
  selector: 'app-basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css']
})
export class BasketComponent implements OnInit {

  products:Product[];
  customer:Customer;

  constructor( private router: Router, private customerService:CustomerService) {
      this.customer = new Customer();
      this.customerService.getBasket().subscribe(products => this.products = products);
  }

  validate(customer:Customer) {
      this.customerService.validate(customer).subscribe(_ => this.router.navigate(['']));
  }

  ngOnInit(){

  }
}
