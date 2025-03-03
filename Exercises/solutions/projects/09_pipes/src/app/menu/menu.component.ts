import { Component, computed, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private basketService = inject(BasketService);

  numberOfItems = computed<number>(() => this.basketService.items().length);
}
