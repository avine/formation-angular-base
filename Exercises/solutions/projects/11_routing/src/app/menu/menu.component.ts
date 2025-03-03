import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [RouterLink],
})
export class MenuComponent {
  private basketService = inject(BasketService);

  numberOfItems = computed<number>(() => this.basketService.items().length);
}
