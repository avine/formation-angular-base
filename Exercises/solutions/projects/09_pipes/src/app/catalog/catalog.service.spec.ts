import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decrease the product stock', () => {
    // Given
    expect(service.products()[0].stock).toBe(2);

    // When
    service.decreaseStock('welsch');

    // Then
    expect(service.products()[0].stock).toBe(1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    // Given
    expect(service.products()[0].stock).toBe(2);

    // When
    service.decreaseStock('welsch');
    // Then
    expect(service.products()[0].stock).toBe(1);

    // When
    service.decreaseStock('welsch');
    // Then
    expect(service.products()[0].stock).toBe(0);

    // When
    service.decreaseStock('welsch');
    // Then
    expect(service.products()[0].stock).toBe(0);
  });
});
