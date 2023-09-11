import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { BasketStubService } from './basket/basket.service.stub';
import { CatalogService } from './catalog/catalog.service';
import { CatalogStubService } from './catalog/catalog.service.stub';
import { SortProductsStubPipe } from './sort-products/sort-products.pipe.stub';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SortProductsStubPipe],
      providers: [
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: BasketService, useClass: BasketStubService },
        { provide: APP_TITLE, useValue: 'The App Title' },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title', () => {
    const appTitle = (fixture.nativeElement.querySelector('h1') as HTMLElement).textContent;
    expect(appTitle).toContain('The App Title');
  });

  it('should display the basket total with currency', () => {
    (TestBed.inject(BasketService) as unknown as BasketStubService).total$.next(99);

    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header p');
    expect(header?.textContent).toContain('$' + 99); // <-- in the test we are still in '$' and 'en-US'
  });

  it('should display the products', () => {
    const products = (TestBed.inject(CatalogService) as unknown as CatalogStubService).products$.value;

    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(products[index]);
    });
  });

  it('should call "BasketService.addItem" and "CatalogService.decreaseStock" methods when a product is added to the basket', () => {
    const decreaseStockSpy = spyOn(TestBed.inject(CatalogService), 'decreaseStock').and.callThrough();
    const addItemSpy = spyOn(TestBed.inject(BasketService), 'addItem').and.callThrough();

    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', { id: 'ID_1' });

    // Then
    expect(decreaseStockSpy).toHaveBeenCalledWith('ID_1');
    expect(addItemSpy).toHaveBeenCalledWith('ID_1');
  });

  it('should not display products with empty stock', () => {
    // Given
    expect((TestBed.inject(CatalogService) as unknown as CatalogStubService).products$.value).toHaveSize(3);

    // When/Then
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(2); // Note: the third product stock equals 0
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    (TestBed.inject(CatalogService) as unknown as CatalogStubService).hasProductsInStock$.next(false);
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
