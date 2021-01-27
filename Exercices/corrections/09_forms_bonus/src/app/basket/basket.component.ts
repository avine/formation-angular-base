import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: Product[];
  customerForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
      creditCard: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{3}$/)]),
    });
    this.customerService.getBasket().subscribe(products => this.basket = products);
  }

  checkout() {
    this.customerService.checkout(this.customerForm.value).subscribe(() => this.router.navigate(['']));
  }

  get name() {
    return this.customerForm.get('name');
  }

  get address() {
    return this.customerForm.get('address');
  }

  get creditCard() {
    return this.customerForm.get('creditCard');
  }
}
