import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../product/product.types';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CatalogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  function fetchProductsController(response: Product[]) {
    const req = httpTestingController.expectOne('http://localhost:8080/api/products');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const response: Product[] = [{ id: 'ID_1' } as Product, { id: 'ID_2' } as Product];

    service.fetchProducts().subscribe((products) => expect(products).toEqual(response));

    fetchProductsController(response);
  });

  it('should fill products after fetching', () => {
    const response: Product[] = [{ id: 'ID_1' } as Product, { id: 'ID_2' } as Product];

    service.fetchProducts().subscribe(() => expect(service.products).toEqual(response));

    fetchProductsController(response);
  });

  it('should decrease the product stock', () => {
    const response: Product[] = [{ id: 'ID_1', stock: 1 } as Product];

    service.fetchProducts().subscribe(() => {
      expect(service.products[0].stock).toBe(1);

      service.decreaseStock('ID_1');
      expect(service.products[0].stock).toBe(0);
    });

    fetchProductsController(response);
  });

  it('should not decrease the product stock when stock is empty', () => {
    const response: Product[] = [{ id: 'ID_1', stock: 1 } as Product];

    service.fetchProducts().subscribe(() => {
      expect(service.products[0].stock).toBe(1);

      expect(service.decreaseStock('ID_1')).toBeTrue();
      expect(service.products[0].stock).toBe(0);

      expect(service.decreaseStock('ID_1')).toBeFalse();
      expect(service.products[0].stock).toBe(0);
    });

    fetchProductsController(response);
  });
});
