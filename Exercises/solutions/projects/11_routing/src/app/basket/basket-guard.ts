import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BasketResource } from './basket-resource';

export const basketGuard: CanMatchFn = (): Observable<boolean> => {
  return inject(BasketResource)
    .fetchBasket()
    .pipe(map(({ length }) => length > 0));
};
