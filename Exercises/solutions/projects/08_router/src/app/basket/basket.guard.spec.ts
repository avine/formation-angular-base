import { firstValueFrom, Observable } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route } from '@angular/router';

import { basketGuard } from './basket.guard';
import { BasketService } from './basket.service';
import { BasketStubService } from './basket.service.stub';
import { BasketItem } from './basket.types';

describe('basketGuard', () => {
  const _executeGuard: CanMatchFn = (route, segments) =>
    TestBed.runInInjectionContext(() => basketGuard(route, segments));

  const executeGuard = () => _executeGuard({} as Route, []) as Observable<boolean>;

  let basketService: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BasketService, useClass: BasketStubService }],
    });

    basketService = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should dispatch items', () => {
    const dispatchItemsSpy = spyOn(basketService, 'dispatchItems').and.callThrough();

    executeGuard();

    expect(dispatchItemsSpy).toHaveBeenCalled();
  });

  it('should return false when the basket is empty', async () => {
    const result = await firstValueFrom(executeGuard());
    expect(result).toBeFalse();
  });

  it('should return true when the basket is not empty', async () => {
    (basketService as unknown as BasketStubService).items$.next([{} as BasketItem]);

    const result = await firstValueFrom(executeGuard());
    expect(result).toBeTrue();
  });
});
