import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../product/product.types';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    });
    service = TestBed.inject(CatalogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchProducts', () => {
    it('should trigger an http call to get the product list', () => {
      service.fetchProducts().subscribe();

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      expect(req.request.method).toBe('GET');
    });

    it('should expose an observable with the product list', () => {
      const responseProducts: Product[] = [
        { id: 't-shirt', title: 't-shirt', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ];

      service.fetchProducts().subscribe((products) => {
        expect(products).toBe(responseProducts);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      req.flush(responseProducts);
    });

    it('should update products with the received products when the http call succeed', () => {
      expect(service.products()).toEqual([]);

      const responseProducts: Product[] = [
        { id: 't-shirt', title: 't-shirt', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ];

      service.fetchProducts().subscribe(() => {
        expect(service.products()).toBe(responseProducts);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/products');
      req.flush(responseProducts);
    });
  });

  describe('decreaseStock', () => {
    it('should decrease the product stock', () => {
      // Given
      service['_products'].set([
        { id: 'welsch', title: 'welsch', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ]);

      expect(service.products()[0].stock).toBe(2);

      // When
      service.decreaseStock('welsch');

      // Then
      expect(service.products()[0].stock).toBe(1);
    });

    it('should not decrease the product stock when stock is empty', () => {
      // Given
      service['_products'].set([
        { id: 'welsch', title: 'welsch', price: 10, description: '', photo: '', stock: 2 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20, description: '', photo: '', stock: 3 },
      ]);

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
});
