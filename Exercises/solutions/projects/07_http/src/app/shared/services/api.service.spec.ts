import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BasketItem } from '../../basket/basket.types';
import { Product } from '../../product/product.types';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the products', () => {
    const response: Product[] = [{ id: 'ID_1' } as Product, { id: 'ID_2' } as Product];

    service.fetchProducts().subscribe((products) => expect(products).toEqual(response));

    const req = httpTestingController.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  });

  it('should fetch one product', () => {
    const productId = 'XYZ';
    const response = { id: productId } as Product;

    service.fetchProduct(productId).subscribe((products) => expect(products).toEqual(response));

    const req = httpTestingController.expectOne(`http://localhost:8080/api/products/${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  });

  it('should fetch the basket', () => {
    const response: BasketItem[] = [{ id: 'ID_1' } as BasketItem, { id: 'ID_2' } as BasketItem];

    service.fetchBasket().subscribe((items) => expect(items).toEqual(response));

    const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  });

  it('should add item to basket', () => {
    const productId = 'XYZ';
    const response = { id: productId } as BasketItem;

    service.addToBasket(productId).subscribe((item) => expect(item).toEqual(response));

    const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ productId });
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  });
});
