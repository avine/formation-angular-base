import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CatalogResource } from './catalog-resource';

describe('CatalogResource', () => {
  let service: CatalogResource;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(CatalogResource);
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
