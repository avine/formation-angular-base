import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { CheckoutDetails } from './checkout-form.types';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
})
export class CheckoutFormComponent {
  protected orderNumber?: number;

  protected checkoutInProgress = false;

  protected checkoutError = false;

  constructor(
    private httpClient: HttpClient,
    private basketService: BasketService,
  ) {}

  protected checkout(checkoutDetails: CheckoutDetails) {
    this.checkoutInProgress = true;

    this.httpClient
      .post<{ orderNumber: number }>('http://localhost:8080/api/basket/checkout', checkoutDetails)
      .subscribe({
        next: ({ orderNumber }) => {
          this.orderNumber = orderNumber;
          this.basketService.clearBasket();
        },
        error: () => {
          this.checkoutInProgress = false;
          this.checkoutError = true;
        },
      });
  }
}
