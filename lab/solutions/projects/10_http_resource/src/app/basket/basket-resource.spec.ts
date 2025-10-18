import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BasketResource } from './basket-resource';
import { BasketItem } from './basket-types';

describe('BasketResource', () => {
  let service: BasketResource;
  let httpTestingController: HttpTestingController;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(withFetch()), provideHttpClientTesting()],
    });
    service = TestBed.inject(BasketResource);
    appRef = TestBed.inject(ApplicationRef);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger an http call to get the basket items', () => {
    appRef.tick(); // Trigger the HTTP request

    const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
    expect(req.request.method).toBe('GET');
  });

  describe('items', () => {
    it('should return the basket items', async () => {
      const responseItems: BasketItem[] = [
        { id: 't-shirt', title: 't-shirt', price: 10 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20 },
      ];

      appRef.tick();

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItems);

      await appRef.whenStable();

      expect(service.items()).toBe(responseItems);
    });

    it('should update total when the http call succeed', async () => {
      const responseItems: BasketItem[] = [
        { id: 't-shirt', title: 't-shirt', price: 10 },
        { id: 'sweatshirt', title: 'sweatshirt', price: 20 },
      ];

      appRef.tick();

      const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
      req.flush(responseItems);

      await appRef.whenStable();

      expect(service.total()).toBe(30);
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
