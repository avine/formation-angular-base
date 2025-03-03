import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update items when item added', () => {
    // Given
    expect(service.items()).toHaveSize(0);

    // When
    service.addItem({ id: 'ID_1', title: 'TITLE_1', price: 1 });
    // Then
    expect(service.items()).toHaveSize(1);
    expect(service.items()[0].id).toBe('ID_1');

    // When
    service.addItem({ id: 'ID_2', title: 'TITLE_2', price: 2 });
    // Then
    expect(service.items()).toHaveSize(2);
    expect(service.items()[1].id).toBe('ID_2');
  });

  it('should update the total when item added', () => {
    // Given
    expect(service.total()).toBe(0);

    // When
    service.addItem({ id: 'ID_1', title: 'TITLE_1', price: 1 });
    // Then
    expect(service.total()).toBe(1);

    // When
    service.addItem({ id: 'ID_2', title: 'TITLE_2', price: 2 });
    // Then
    expect(service.total()).toBe(3);
  });
});
