import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BasketResource } from '../basket-resource';
import { CheckoutDetails } from '../basket-types';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.html',
  imports: [FormsModule, RouterLink],
})
export class CheckoutForm {
  private basketService = inject(BasketResource);

  protected orderNumber = signal<number | undefined>(undefined);

  protected checkoutInProgress = signal(false);

  protected checkoutError = signal(false);

  protected checkout(checkoutDetails: CheckoutDetails) {
    this.checkoutInProgress.set(true);

    this.basketService.checkout(checkoutDetails).subscribe({
      next: ({ orderNumber }) => {
        this.orderNumber.set(orderNumber);
      },
      error: () => {
        this.checkoutInProgress.set(false);
        this.checkoutError.set(true);
      },
    });
  }
}
