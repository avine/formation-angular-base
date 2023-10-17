import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

describe('BasketService', () => {
  let service: BasketService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BasketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  function fetchItemsController(response: BasketItem[]) {
    const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  }

  function addItemController(response: BasketItem) {
    const req = httpTestingController.expectOne('http://localhost:8080/api/basket');
    expect(req.request.method).toEqual('POST');
    req.flush(response);

    httpTestingController.verify(); // assert that there are no outstanding requests
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch items', () => {
    const response: BasketItem[] = [{ id: 'ID_1' } as BasketItem, { id: 'ID_2' } as BasketItem];

    service.fetchItems().subscribe((items) => expect(items).toEqual(response));

    fetchItemsController(response);
  });

  it('should fill items after fetching', () => {
    const response: BasketItem[] = [{ id: 'ID_1' } as BasketItem, { id: 'ID_2' } as BasketItem];

    service.fetchItems().subscribe(() => expect(service.items).toEqual(response));

    fetchItemsController(response);
  });

  it('should send post request when item added', () => {
    const response: BasketItem = { id: 'ID_1' } as BasketItem;

    service.addItem('ID_1').subscribe((item) => expect(item).toEqual(response));

    addItemController(response);
  });

  it('should update items when item added', () => {
    const response1: BasketItem = { id: 'ID_1' } as BasketItem;
    const response2: BasketItem = { id: 'ID_2' } as BasketItem;

    expect(service.items).toEqual([]);

    service.addItem('ID_1').subscribe(() => expect(service.items).toEqual([response1]));
    addItemController(response1);

    service.addItem('ID_2').subscribe(() => expect(service.items).toEqual([response1, response2]));
    addItemController(response2);
  });

  it('should update the total when item added', () => {
    const response1: BasketItem = { id: 'ID_1', price: 1 } as BasketItem;
    const response2: BasketItem = { id: 'ID_2', price: 2 } as BasketItem;

    expect(service.total).toEqual(0);

    service.addItem('ID_1').subscribe(() => expect(service.total).toEqual(response1.price));
    addItemController(response1);

    service.addItem('ID_2').subscribe(() => expect(service.total).toEqual(response1.price + response2.price));
    addItemController(response2);
  });
});
