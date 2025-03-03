import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { BasketStubService } from './basket/basket.service.stub';
import { CatalogService } from './catalog/catalog.service';
import { CatalogStubService } from './catalog/catalog.service.stub';
import { ProductComponent } from './product/product.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: BasketService, useClass: BasketStubService },
        { provide: APP_TITLE, useValue: 'The App Title' },
      ],
    }).overrideComponent(AppComponent, {
      remove: {
        imports: [ProductComponent],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
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

  it('should display the basket total', () => {
    (TestBed.inject(BasketService) as unknown as BasketStubService).total.set(99);
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(99);
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products()[index]);
    });
  });

  it('should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket', () => {
    const decreaseStockSpy = spyOn(TestBed.inject(CatalogService), 'decreaseStock');
    const addItemSpy = spyOn(TestBed.inject(BasketService), 'addItem');

    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', component.products()[0]);

    // Then
    const { id, title, price } = component.products()[0];
    expect(decreaseStockSpy).toHaveBeenCalledWith(id);
    expect(addItemSpy).toHaveBeenCalledWith({ id, title, price });
  });

  it('should not display products with empty stock', () => {
    // Given
    expect(component.products()).toHaveSize(3);

    // When/Then
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(2); // Note: the third product stock equals 0

    // When
    (TestBed.inject(CatalogService) as unknown as CatalogStubService).products()[0].stock = 0; // !FIXME: code smell
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(1);
    expect(productDebugElements[0].properties['product']).toBe(component.products()[1]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    (TestBed.inject(CatalogService) as unknown as CatalogStubService).hasProductsInStock.set(false);
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
