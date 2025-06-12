import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import { basketGuard } from './basket-guard';
import { BasketResource } from './basket-resource';
import { BasketResourceMock } from './basket-resource.mock';
import { BasketItem } from './basket-types';

describe('basketGuard', () => {
  const _executeGuard: CanMatchFn = (route, segments) =>
    TestBed.runInInjectionContext(() => basketGuard(route, segments));

  const executeGuard = () => _executeGuard({} as Route, []) as Observable<boolean>;

  let basketResource: BasketResource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BasketResource, useClass: BasketResourceMock }],
    });

    basketResource = TestBed.inject(BasketResource);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should fetch items', () => {
    const fetchItemsSpy = spyOn(basketResource, 'fetchBasket').and.callThrough();

    executeGuard();

    expect(fetchItemsSpy).toHaveBeenCalled();
  });

  it('should return false when the basket is empty', async () => {
    const result = await firstValueFrom(executeGuard());
    expect(result).toBeFalse();
  });

  it('should return true when the basket is not empty', async () => {
    spyOn(basketResource, 'fetchBasket').and.returnValue(of([{} as BasketItem]));

    const result = await firstValueFrom(executeGuard());
    expect(result).toBeTrue();
  });
});
