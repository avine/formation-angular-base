import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { APP_TITLE } from '../app.token';
import { BasketService } from '../basket/basket.service';
import { BasketStubService } from '../basket/basket.service.stub';
import { CatalogService } from '../catalog/catalog.service';
import { CatalogStubService } from '../catalog/catalog.service.stub';
import { Product } from '../product/product.types';
import { SortProductsPipe } from '../sort-products/sort-products.pipe';
import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let fixture: ComponentFixture<CatalogComponent>;
  let component: CatalogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent, SortProductsPipe],
      providers: [
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: BasketService, useClass: BasketStubService },
        { provide: APP_TITLE, useValue: 'The App Title' },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(CatalogComponent);
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
    (TestBed.inject(BasketService) as BasketStubService).total = 99;
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain('$' + 99); // <-- in the test we are still in '$' and 'en-US'
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products?.[index]);
    });
  });

  it('should display the products sorted by price', () => {
    component.productKey = 'price';
    fixture.detectChanges();

    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));

    const expectedComponentProducts = component.products
      ?.filter(({ stock }) => stock > 0)
      .sort((p1, p2) => (p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0));

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(expectedComponentProducts?.[index]);
    });
  });

  it('should display the products sorted by stock', () => {
    component.productKey = 'stock';
    fixture.detectChanges();

    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));

    const expectedComponentProducts = component.products
      ?.filter(({ stock }) => stock > 0)
      .sort((p1, p2) => (p1.stock > p2.stock ? 1 : p1.stock < p2.stock ? -1 : 0));

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(expectedComponentProducts?.[index]);
    });
  });

  it('should call "BasketService.addItem" and "CatalogService.decreaseStock" methods when a product is added to the basket', () => {
    const product0 = component.products?.[0] as Product;

    const decreaseStockSpy = spyOn(TestBed.inject(CatalogService), 'decreaseStock');
    const addItemSpy = spyOn(TestBed.inject(BasketService), 'addItem').and.returnValue(of(product0));

    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', product0);

    // Then
    expect(decreaseStockSpy).toHaveBeenCalledWith(product0.id);
    expect(addItemSpy).toHaveBeenCalledWith(product0.id);
  });

  it('should not display products with empty stock', () => {
    // Given
    expect(component.products).toHaveSize(3);

    // When/Then
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(2); // Note: the third product stock equals 0

    // When
    ((TestBed.inject(CatalogService) as CatalogStubService).products?.[0] as Product).stock = 0;
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(1);
    expect(productDebugElements[0].properties['product']).toBe(component.products?.[1]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    (TestBed.inject(CatalogService) as CatalogStubService).hasProductsInStock = false;
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
