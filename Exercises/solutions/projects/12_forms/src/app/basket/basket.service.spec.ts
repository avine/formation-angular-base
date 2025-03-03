import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

describe('BasketService', () => {
  let service: BasketService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    });
    service = TestBed.inject(BasketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchBasket', () => {
    it('should trigger an http call to get the basket items', () => {
      service.fetchBasket().subscribe();

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      expect(req.request.method).toBe('GET');
    });

    it('should expose an observable with the basket items', () => {
      const responseItems: BasketItem[] = [
        { id: 't-shirt', title: 't-shirt', price: 10 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20 },
      ];

      service.fetchBasket().subscribe((items) => {
        expect(items).toBe(responseItems);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItems);
    });

    it('should update items with the received basket items when the http call succeed', () => {
      expect(service.items()).toEqual([]);

      const responseItems: BasketItem[] = [
        { id: 't-shirt', title: 't-shirt', price: 10 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20 },
      ];

      service.fetchBasket().subscribe(() => {
        expect(service.items()).toBe(responseItems);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItems);
    });

    it('should update total when the http call succeed', () => {
      expect(service.items()).toEqual([]);

      const responseItems: BasketItem[] = [
        { id: 't-shirt', title: 't-shirt', price: 10 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20 },
      ];

      service.fetchBasket().subscribe(() => {
        expect(service.total()).toBe(30);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItems);
    });
  });

  describe('addItem', () => {
    it('should trigger an http call to add the received item to the basket', () => {
      service.addItem('t-shirt').subscribe();

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      expect(req.request.method).toBe('POST');
    });

    it('should expose an observable with the added product', () => {
      const responseItem = {
        id: 't-shirt',
        title: 't-shirt',
        price: 20,
      };

      service.addItem('t-shirt').subscribe((item) => {
        expect(item).toEqual(responseItem);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItem);
    });

    it('should add the item to the items tracking property and update the total when the http call succeed', () => {
      expect(service.items()).toEqual([]);

      const responseItem = {
        id: 't-shirt',
        title: 't-shirt',
        price: 20,
      };

      service.addItem('t-shirt').subscribe(() => {
        expect(service.items()).toEqual([responseItem]);
        expect(service.total()).toBe(20);
      });

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItem);
    });
  });
});
