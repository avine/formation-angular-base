import { map, Observable } from 'rxjs';

import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { BasketService } from './basket.service';

export const basketGuard: CanMatchFn = (): Observable<boolean> => {
  const basketService = inject(BasketService);

  basketService.dispatchItems().subscribe();

  return basketService.items$.pipe(map(({ length }) => length > 0));
};
