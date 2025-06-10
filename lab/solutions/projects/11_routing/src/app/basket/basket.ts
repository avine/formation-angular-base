import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasketResource } from './basket-resource';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html',
  imports: [CurrencyPipe],
})
export class Basket {
  private basketResource = inject(BasketResource);

  protected items = this.basketResource.items;

  protected total = this.basketResource.total;
}
