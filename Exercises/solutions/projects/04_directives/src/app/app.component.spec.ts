import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products[index]);
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
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements[1].triggerEventHandler('addToBasket', component.products[1]);
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
    // Given
    expect(component.products[0].stock).toBe(2);

    // When
    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', component.products[0]);

    // Then
    expect(component.products[0].stock).toBe(1);
  });

  it('should not display products whose stock is empty', () => {
    // Given
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(4);

    // When
    component.products[0].stock = 0;
    component.products[1].stock = 0;
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(2);
    expect(productDebugElements[0].properties['product']).toBe(component.products[2]);
    expect(productDebugElements[1].properties['product']).toBe(component.products[3]);
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
