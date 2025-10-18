import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Product } from '../product/product-types';
import { CatalogResource } from './catalog-resource';

describe('CatalogResource', () => {
  let service: CatalogResource;
  let httpTestingController: HttpTestingController;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(withFetch()), provideHttpClientTesting()],
    });
    service = TestBed.inject(CatalogResource);
    appRef = TestBed.inject(ApplicationRef);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger an http call to get the product list', () => {
    appRef.tick(); // Trigger the HTTP request

    const req = httpTestingController.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toBe('GET');
  });

  describe('productsInStock', () => {
    it('should return the product list', async () => {
      const responseProducts: Product[] = [
        { id: 't-shirt', title: 't-shirt', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ];

      appRef.tick();

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      req.flush(responseProducts);

      await appRef.whenStable();

      expect(service.productsInStock()).toEqual(responseProducts);
    });

    it('should only return the products in stock', async () => {
      const responseProducts: Product[] = [
        { id: 't-shirt', title: 't-shirt', price: 10, description: '', photo: '', stock: 1 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 0 }, // <-- no stock
      ];

      appRef.tick();

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      req.flush(responseProducts);

      await appRef.whenStable();

      expect(service.productsInStock()).toEqual([responseProducts[0]]);
    });
  });

  describe('decreaseStock', () => {
    it('should decrease the product stock', async () => {
      // Given
      const responseProducts: Product[] = [
        { id: 'welsch', title: 'welsch', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ];

      appRef.tick();

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      req.flush(responseProducts);

      await appRef.whenStable();

      expect(service.products()?.[0].stock).toBe(2);

      // When
      service.decreaseStock('welsch');

      // Then
      expect(service.products()?.[0].stock).toBe(1);
    });

    it('should not decrease the product stock when stock is empty', async () => {
      // Given
      const responseProducts: Product[] = [
        { id: 'welsch', title: 'welsch', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ];

      appRef.tick();

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      req.flush(responseProducts);

      await appRef.whenStable();

      expect(service.products()?.[0].stock).toBe(2);

      // When
      service.decreaseStock('welsch');
      // Then
      expect(service.products()?.[0].stock).toBe(1);

      // When
      service.decreaseStock('welsch');
      // Then
      expect(service.products()?.[0].stock).toBe(0);

      // When
      service.decreaseStock('welsch');
      // Then
      expect(service.products()?.[0].stock).toBe(0);
    });
  });
});
