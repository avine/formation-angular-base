import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { App } from './app';
import { APP_TITLE } from './app.token';
import { BasketResource } from './basket/basket-resource';
import { BasketResourceStub } from './basket/basket-resource.stub';
import { CatalogResource } from './catalog/catalog-resource';
import { CatalogResourceStub } from './catalog/catalog-resource.stub';
import { ProductCard } from './product/product-card';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: CatalogResource, useClass: CatalogResourceStub },
        { provide: BasketResource, useClass: BasketResourceStub },
        { provide: APP_TITLE, useValue: 'The App Title' },
      ],
    })
      .overrideComponent(App, {
        remove: {
          imports: [ProductCard],
        },
        add: {
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(App);
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
    (TestBed.inject(BasketResource) as unknown as BasketResourceStub).total.set(99);
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain('$' + 99); // <-- in the test we are still in '$' and 'en-US'
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products()[index]);
    });
  });

  it('should display the products sorted by price', () => {
    component.productKey.set('price');
    fixture.detectChanges();

    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    const expectedComponentProducts = component
      .products()
      .filter(({ stock }) => stock > 0)
      .sort((p1, p2) => (p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0));

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(expectedComponentProducts[index]);
    });
  });

  it('should display the products sorted by stock', () => {
    component.productKey.set('stock');
    fixture.detectChanges();

    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    const expectedComponentProducts = component
      .products()
      .filter(({ stock }) => stock > 0)
      .sort((p1, p2) => (p1.stock > p2.stock ? 1 : p1.stock < p2.stock ? -1 : 0));

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(expectedComponentProducts[index]);
    });
  });

  it('should call "BasketService.addItem" and "CatalogService.decreaseStock" methods when a product is added to the basket', () => {
    const addItemSpy = spyOn(TestBed.inject(BasketResource), 'addItem').and.returnValue(
      of({ id: 't-shirt', title: 't-shirt', price: 10 }),
    );
    const decreaseStockSpy = spyOn(TestBed.inject(CatalogResource), 'decreaseStock');

    const productDebugElement = fixture.debugElement.query(By.css('app-product-card'));
    productDebugElement.triggerEventHandler('addToBasket', component.products()[0]);

    // Then
    const { id } = component.products()[0];
    expect(addItemSpy).toHaveBeenCalledWith(id);
    expect(decreaseStockSpy).toHaveBeenCalledWith(id);
  });

  it('should not display products with empty stock', () => {
    // Given
    expect(component.products()).toHaveSize(3);

    // When/Then
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productDebugElements).toHaveSize(2); // Note: the third product stock equals 0

    // When
    (TestBed.inject(CatalogResource) as unknown as CatalogResourceStub).products()[0].stock = 0; // !FIXME: code smell
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productDebugElements).toHaveSize(1);
    expect(productDebugElements[0].properties['product']).toBe(component.products()[1]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    (TestBed.inject(CatalogResource) as unknown as CatalogResourceStub).hasProductsInStock.set(false);
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
