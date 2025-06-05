import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasketResource } from './basket-resource';
import { CheckoutForm } from './checkout-form/checkout-form';
import { CheckoutReactiveForm } from './checkout-reactive-form/checkout-reactive-form';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html',
  imports: [CurrencyPipe, FormsModule, CheckoutForm, CheckoutReactiveForm],
})
export class Basket {
  private basketResource = inject(BasketResource);

  protected items = this.basketResource.items;

  protected total = this.basketResource.total;

  protected reactive = false;
}
