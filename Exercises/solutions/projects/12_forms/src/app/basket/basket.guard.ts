import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BasketService } from './basket.service';

export const basketGuard: CanMatchFn = (): Observable<boolean> => {
  return inject(BasketService)
    .fetchBasket()
    .pipe(map(({ length }) => length > 0));
};
