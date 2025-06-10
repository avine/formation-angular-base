import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketResource } from '../basket/basket-resource';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  imports: [RouterLink],
})
export class Menu {
  private basketResource = inject(BasketResource);

  numberOfItems = computed<number>(() => this.basketResource.items().length);
}
