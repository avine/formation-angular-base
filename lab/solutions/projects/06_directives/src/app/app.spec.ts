import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { ProductCard } from './product/product-card';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
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

    // We must call `fixture.detectChanges()` at the beginning of each test (not in the `beforeEach` section).
    // This is because our component's state is defined by raw values (like `total`),
    // not signals (we'll cover signals later in the training).
    // And since we're using raw values, we must modify them before calling `fixture.detectChanges()`,
    // otherwise we'll encounter the error `ExpressionChangedAfterItHasBeenCheckedError`.
  });

  it('should create the app', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    fixture.detectChanges();

    const productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    productCardDebugElements.forEach((productCardDebugElement, index) => {
      expect(productCardDebugElement.properties['product']).toBe(component.products[index]);
    });
  });

  // ----- DOM Testing (the hard way) -----
  it('should update the total when a product emits the "addToBasket" event', () => {
    // Given
    component.total = 99;
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(99);

    // When
    const productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    productCardDebugElements[1].triggerEventHandler('addToBasket', component.products[1]);
    fixture.detectChanges();

    // Then
    expect(header?.textContent).toContain(99 + component.products[1].price);
  });

  // ----- Class Testing (the easy way) -----
  it('should update the total when "addToBasket" class method is called', () => {
    // Given
    component.total = 99;

    // When
    component.addToBasket(component.products[1]);

    // Then
    expect(component.total).toBe(99 + component.products[1].price);
  });

  /* ----- NEW TESTS STARTS HERE ----- */

  it('should decrease the stock of the product added to the basket', () => {
    fixture.detectChanges();

    // Given
    expect(component.products[0].stock).toBe(2);

    // When
    const productCardDebugElement = fixture.debugElement.query(By.css('app-product-card'));
    productCardDebugElement.triggerEventHandler('addToBasket', component.products[0]);

    // Then
    expect(component.products[0].stock).toBe(1);
  });

  it('should not display products whose stock is empty', () => {
    fixture.detectChanges();

    // Given
    let productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productCardDebugElements).toHaveLength(4);

    // When
    component.products[0].stock = 0;
    component.products[1].stock = 0;
    fixture.detectChanges();

    // Then
    productCardDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productCardDebugElements).toHaveLength(2);
    expect(productCardDebugElements[0].properties['product']).toBe(component.products[2]);
    expect(productCardDebugElements[1].properties['product']).toBe(component.products[3]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.text-secondary');
    expect(element).toBeNull();

    // When
    component.products[0].stock = 0;
    component.products[1].stock = 0;
    component.products[2].stock = 0;
    component.products[3].stock = 0;
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.text-secondary');

    expect(element).not.toBeNull();
    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});
