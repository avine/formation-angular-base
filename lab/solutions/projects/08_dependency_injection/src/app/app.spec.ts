import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should display the basket total', () => {
    (TestBed.inject(BasketResource) as unknown as BasketResourceStub).total.set(99);
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(99);
  });

  it('should display the products', () => {
    const productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    productCardDebugElements.forEach((productCardDebugElement, index) => {
      expect(productCardDebugElement.properties['product']).toBe(component.products()[index]);
    });
  });

  it('should call "CatalogResource.decreaseStock" and "BasketResource.addItem" methods when a product is added to the basket', () => {
    const decreaseStockSpy = spyOn(TestBed.inject(CatalogResource), 'decreaseStock');
    const addItemSpy = spyOn(TestBed.inject(BasketResource), 'addItem');

    const productCardDebugElement = fixture.debugElement.query(By.css('app-product-card'));
    productCardDebugElement.triggerEventHandler('addToBasket', component.products()[0]);

    // Then
    const { id, title, price } = component.products()[0];
    expect(decreaseStockSpy).toHaveBeenCalledWith(id);
    expect(addItemSpy).toHaveBeenCalledWith({ id, title, price });
  });

  it('should not display products with empty stock', () => {
    // Given
    expect(component.products()).toHaveSize(3);

    // When/Then
    let productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productCardDebugElements).toHaveSize(2); // Note: the third product stock equals 0

    // When
    (TestBed.inject(CatalogResource) as unknown as CatalogResourceStub).products.update((products) => {
      const [first, ...rest] = products;
      return [{ ...first, stock: 0 }, ...rest];
    });
    fixture.detectChanges();

    // Then
    productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productCardDebugElements).toHaveSize(1);
    expect(productCardDebugElements[0].properties['product']).toBe(component.products()[1]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    (TestBed.inject(CatalogResource) as unknown as CatalogResourceStub).products.set([
      {
        id: 'ID_3',
        title: 'TITLE_3',
        description: 'DESC_3',
        photo: 'PHOTO_3',
        price: 1,
        stock: 0,
      },
    ]);
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
