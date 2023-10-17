import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasketService } from '../basket/basket.service';
import { CheckoutDetails } from './checkout-reactive-form.types';

@Component({
  selector: 'app-checkout-reactive-form',
  templateUrl: './checkout-reactive-form.component.html',
})
export class CheckoutReactiveFormComponent implements OnDestroy {
  protected orderNumber?: number;

  protected checkoutError = false;

  protected checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    creditCard: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{3}$/)]),
  });

  subscription = this.checkoutForm.valueChanges.subscribe(() => (this.checkoutError = false));

  constructor(
    private httpClient: HttpClient,
    private basketService: BasketService,
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  protected checkout() {
    this.checkoutForm.disable();

    const checkoutDetails = this.checkoutForm.value as CheckoutDetails;

    this.httpClient
      .post<{ orderNumber: number }>('http://localhost:8080/api/basket/checkout', checkoutDetails)
      .subscribe({
        next: ({ orderNumber }) => {
          this.orderNumber = orderNumber;
          this.basketService.clearBasket();
        },
        error: () => {
          this.checkoutForm.enable();
          this.checkoutError = true;
        },
      });
  }
}
