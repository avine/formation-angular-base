import { map } from 'rxjs';

import { Component } from '@angular/core';

import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  numberOfItems$ = this.basketService.items$.pipe(map(({ length }) => length));

  constructor(private basketService: BasketService) {}
}
