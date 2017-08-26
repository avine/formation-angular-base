import { TestBed, inject } from '@angular/core/testing';
import { UpperCasePipe } from '@angular/common';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ProductService } from './product.service';
import { Product } from '../model/product';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ProductService,
        UpperCasePipe,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  it('should be created with 4 products',
    inject([ProductService, XHRBackend], (service: ProductService, mockBackend: MockBackend) => {
      const mockedResponse = [
        new Product('abc', '', '', 0, 0),
        new Product('def', '', '', 0, 0)
      ];
      const response = new Response(new ResponseOptions({ body: mockedResponse }));
      mockBackend.connections.subscribe(connection => connection.mockRespond(response));

      expect(service).toBeTruthy();
      service.getProducts().subscribe(products => {
        expect(products.length).toBe(2);
        products.forEach(product => {
          expect(product.title).toBe(product.title.toUpperCase());
        });
      });
    })
  );

  it('should isTheLast return true only if stock is 1',
    inject([ProductService], (service: ProductService) => {
      const product = new Product('', '', '', 0, 0);
      expect(service.isTheLast(product)).toBe(false);
      product.stock = 1;
      expect(service.isTheLast(product)).toBe(true);
      product.stock = 2;
      expect(service.isTheLast(product)).toBe(false);
      product.stock = 100;
      expect(service.isTheLast(product)).toBe(false);
    })
  );

  it('should isAvailable return false only if stock is 0',
    inject([ProductService], (service: ProductService) => {
      const product = new Product('', '', '', 0, 0);
      expect(service.isAvailable(product)).toBe(false);
      product.stock = 1;
      expect(service.isAvailable(product)).toBe(true);
      product.stock = 2;
      expect(service.isAvailable(product)).toBe(true);
      product.stock = 100;
      expect(service.isAvailable(product)).toBe(true);
    })
  );

  it('should decreaseStock decrease product stock of 1',
    inject([ProductService], (service: ProductService) => {
      const product = new Product('', '', '', 0, 42);
      service.decreaseStock(product);
      expect(product.stock).toBe(42 - 1);
    })
  );
});
