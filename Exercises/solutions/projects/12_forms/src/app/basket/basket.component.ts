import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasketService } from './basket.service';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { CheckoutReactiveFormComponent } from './checkout-reactive-form/checkout-reactive-form.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [CurrencyPipe, FormsModule, CheckoutFormComponent, CheckoutReactiveFormComponent],
})
export class BasketComponent {
  private basketService = inject(BasketService);

  protected items = this.basketService.items;

  protected total = this.basketService.total;

  protected reactive = false;
}
