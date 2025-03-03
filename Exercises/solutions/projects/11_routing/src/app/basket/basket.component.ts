import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [CurrencyPipe],
})
export class BasketComponent {
  private basketService = inject(BasketService);

  protected items = this.basketService.items;

  protected total = this.basketService.total;
}
