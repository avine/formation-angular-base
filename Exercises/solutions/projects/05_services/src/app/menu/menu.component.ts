import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  get numberOfItems() {
    return this.basketService.items.length;
  }

  constructor(private basketService: BasketService) {}
}
