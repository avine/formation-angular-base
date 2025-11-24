import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasketResource } from './basket-resource';
import { CheckoutForm } from './checkout-form/checkout-form';
import { CheckoutReactiveForm } from './checkout-reactive-form/checkout-reactive-form';
import { CheckoutSignalForm } from './checkout-signal-form/checkout-signal-form';

type FormSystem = 'template-driven' | 'reactive' | 'signal';

interface InputRadioContext {
  value: FormSystem;
  label: string;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html',
  imports: [CurrencyPipe, NgTemplateOutlet, FormsModule, CheckoutForm, CheckoutReactiveForm, CheckoutSignalForm],
})
export class Basket {
  private basketResource = inject(BasketResource);

  protected items = this.basketResource.items;

  protected total = this.basketResource.total;

  protected formSystem: FormSystem = 'template-driven';

  protected inputRadioContexts: InputRadioContext[] = [
    { value: 'template-driven', label: 'Template-driven form' },
    { value: 'reactive', label: 'Reactive form' },
    { value: 'signal', label: 'Signal form' },
  ];
}
