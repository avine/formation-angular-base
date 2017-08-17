import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CustomerService } from './customer.service';
import { Product } from '../model/product';

const product1 = new Product('', '', '', 42, 0);
const product2 = new Product('', '', '', 666, 0);

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CustomerService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  it('should be created with no product',
    inject([CustomerService], (service: CustomerService) => {
      expect(service).toBeTruthy();
      expect(service.products.length).toBe(0);
    })
  );

  it('should load the basket from the server on getBasket',
    inject([CustomerService, XHRBackend], (service: CustomerService, mockBackend: MockBackend) => {
      const mockedResponse = [
        new Product('abc', '', '', 0, 0),
        new Product('def', '', '', 0, 0)
      ];
      const response = new Response(new ResponseOptions({ body: mockedResponse }));
      mockBackend.connections.subscribe(connection => connection.mockRespond(response));

      service.getBasket().subscribe(() => {
        expect(service.products.length).toBe(2);
      });
    })
  );

  it('should add products to the list when using addProduct',
    inject([CustomerService, XHRBackend], (service: CustomerService, mockBackend: MockBackend) => {
      const response = new Response(new ResponseOptions());
      mockBackend.connections.subscribe(connection => connection.mockRespond(response));

      service.addProduct(product1).subscribe(() => {
        expect(service.products).toEqual([product1]);
      });
    })
  );

  it('should calculate the total price when using getTotal',
    inject([CustomerService], (service: CustomerService) => {
      service.products = [product1, product2];
      expect(service.getTotal()).toBe(product1.price + product2.price);
    })
  );

});
