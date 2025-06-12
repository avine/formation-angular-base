import { Component, computed, inject } from '@angular/core';
import { BasketResource } from '../basket/basket-resource';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
})
export class Menu {
  private basketResource = inject(BasketResource);

  numberOfItems = computed(() => this.basketResource.items()?.length);
}
