import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BasketService } from '../basket.service';
import { CheckoutDetails } from '../basket.types';

@Component({
  selector: 'app-checkout-reactive-form',
  templateUrl: './checkout-reactive-form.component.html',
  imports: [ReactiveFormsModule, RouterLink],
})
export class CheckoutReactiveFormComponent {
  private basketService = inject(BasketService);

  protected orderNumber = signal<number | undefined>(undefined);

  protected checkoutError = signal(false);

  protected checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    creditCard: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{3}$/)]),
  });

  constructor() {
    this.checkoutForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.checkoutError.set(false));
  }

  protected checkout() {
    this.checkoutForm.disable();

    this.basketService.checkout(this.checkoutForm.value as CheckoutDetails).subscribe({
      next: ({ orderNumber }) => {
        this.orderNumber.set(orderNumber);
      },
      error: () => {
        this.checkoutForm.enable();
        this.checkoutError.set(true);
      },
    });
  }
}
