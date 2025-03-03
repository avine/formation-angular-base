import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BasketService } from '../basket.service';
import { CheckoutDetails } from '../basket.types';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  imports: [FormsModule, RouterLink],
})
export class CheckoutFormComponent {
  private basketService = inject(BasketService);

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
