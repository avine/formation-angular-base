import { firstValueFrom, of } from 'rxjs';

import { TestBed, waitForAsync } from '@angular/core/testing';

import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { ApiStubService } from '../shared/services/api.service.stub';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useClass: ApiStubService }],
    });
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* ----- Using "waitForAsync" technique ----- */
  it('should call "ApiService.fetchProducts" when dispatching products', waitForAsync(() => {
    // Given
    const fetchProductsSpy = spyOn(TestBed.inject(ApiService), 'fetchProducts').and.callThrough();
    // When
    service.dispatchProducts().subscribe(() => {
      // Then
      expect(fetchProductsSpy).toHaveBeenCalled();
    });
  }));

  /* ----- Using "async/await" technique ----- */
  it('should have "products$" and "productsSnapshot" producing values', async () => {
    // Given
    expect(service.productsSnapshot).toBeUndefined();
    expect(await firstValueFrom(service.products$)).toBeUndefined();

    // When
    await firstValueFrom(service.dispatchProducts());

    // Then
    expect(service.productsSnapshot).toHaveSize(3);
    expect(await firstValueFrom(service.products$)).toHaveSize(3);
  });

  it('should have "hasProductsInStock$" emitting true', async () => {
    // Given
    spyOn(TestBed.inject(ApiService), 'fetchProducts').and.returnValue(of([{ stock: 1 } as Product]));
    expect(await firstValueFrom(service.hasProductsInStock$)).toBeUndefined();

    // When
    await firstValueFrom(service.dispatchProducts());

    // Then
    expect(await firstValueFrom(service.hasProductsInStock$)).toBeTrue();
  });

  it('should have "hasProductsInStock$" emitting false', async () => {
    // Given
    spyOn(TestBed.inject(ApiService), 'fetchProducts').and.returnValue(of([{ stock: 0 } as Product]));
    expect(await firstValueFrom(service.hasProductsInStock$)).toBeUndefined();

    // When
    await firstValueFrom(service.dispatchProducts());

    // Then
    expect(await firstValueFrom(service.hasProductsInStock$)).toBeFalse();
  });

  it('should decrease the product stock', async () => {
    // Given
    await firstValueFrom(service.dispatchProducts());
    let products = (await firstValueFrom(service.products$)) as Product[];
    expect(products[0].stock).toBe(2);

    // When
    expect(service.decreaseStock('ID_1')).toBeTrue();

    // Then
    products = (await firstValueFrom(service.products$)) as Product[];
    expect(products[0].stock).toBe(1);
  });

  it('should not decrease the product stock when stock is empty', async () => {
    // Given
    await firstValueFrom(service.dispatchProducts());
    let products = (await firstValueFrom(service.products$)) as Product[];
    expect(products[2].stock).toBe(0);

    // When
    expect(service.decreaseStock('ID_3')).toBeFalse();

    // Then
    products = (await firstValueFrom(service.products$)) as Product[];
    expect(products[2].stock).toBe(0);
  });
});
