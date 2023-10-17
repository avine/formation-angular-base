import { Component } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected get items() {
    return this.basketService.items;
  }

  protected get total() {
    return this.basketService.total;
  }

  protected reactive = false;

  constructor(private basketService: BasketService) {}
}
