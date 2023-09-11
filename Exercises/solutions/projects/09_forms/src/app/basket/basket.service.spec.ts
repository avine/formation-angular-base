import { TestBed, waitForAsync } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { ApiStubService } from '../shared/services/api.service.stub';
import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useClass: ApiStubService }],
    });
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* ----- Using "waitForAsync" technique ----- */
  it('should call "ApiService.fetchBasket" when dispatching items', waitForAsync(() => {
    // Given
    const fetchBasketSpy = spyOn(TestBed.inject(ApiService), 'fetchBasket').and.callThrough();
    // When
    service.dispatchItems().subscribe(() => {
      // Then
      expect(fetchBasketSpy).toHaveBeenCalled();
    });
  }));

  /* ----- Using "async/await" technique ----- */
  it('should have "items$" and "itemsSnapshot" producing values', async () => {
    // Given
    expect(service.itemsSnapshot).toBeUndefined();

    // When
    await firstValueFrom(service.dispatchItems());

    // Then
    expect(service.itemsSnapshot).toHaveSize(0);
    expect(await firstValueFrom(service.items$)).toHaveSize(0);
  });

  it('should update items when item added', async () => {
    // When
    await firstValueFrom(service.dispatchItems());
    await firstValueFrom(service.addItem('XYZ'));

    // Then
    expect(service.itemsSnapshot?.[0].id).toBe('XYZ');
    expect((await firstValueFrom(service.items$))?.[0].id).toBe('XYZ');
  });

  it('should update the total when item added', async () => {
    // When
    await firstValueFrom(service.dispatchItems());
    await firstValueFrom(service.addItem('A'));
    await firstValueFrom(service.addItem('B'));

    // Then
    expect(await firstValueFrom(service.total$)).toBe(6);
  });
});
