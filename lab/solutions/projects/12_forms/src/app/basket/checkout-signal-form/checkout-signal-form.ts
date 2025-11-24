import { Component, inject, signal } from '@angular/core';
import { disabled, Field, form, pattern, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BasketResource } from '../basket-resource';
import { CheckoutDetails } from '../basket-types';

@Component({
  selector: 'app-checkout-signal-form',
  templateUrl: './checkout-signal-form.html',
  imports: [Field, RouterLink],
})
export class CheckoutSignalForm {
  private basketResource = inject(BasketResource);

  protected orderNumber = signal<number | undefined>(undefined);

  protected checkoutDetails = signal<CheckoutDetails>({
    name: '',
    address: '',
    creditCard: '',
  });

  protected checkoutForm = form(this.checkoutDetails, (path) => {
    required(path.name, { message: 'Champ obligatoire' });
    required(path.address, { message: 'Champ obligatoire' });
    required(path.creditCard, { message: 'Champ obligatoire' });

    pattern(path.creditCard, /^[0-9]{3}-[0-9]{3}$/, { message: 'Numéro invalide (exemple : 123-456)' });

    disabled(path, () => this.checkoutForm().submitting() || !!this.orderNumber());
  });

  protected checkout(event: SubmitEvent) {
    event.preventDefault();

    submit(this.checkoutForm, async () => {
      try {
        const { orderNumber } = await firstValueFrom(this.basketResource.checkout(this.checkoutDetails()));
        this.orderNumber.set(orderNumber);
        return null;
      } catch {
        return { kind: 'server', message: "Désolé, une erreur s'est produite." };
      }
    });
  }
}
