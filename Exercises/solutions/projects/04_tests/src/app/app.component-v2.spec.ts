import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

describe('AppComponent (second approach - allowing unknown HTML elements)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
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
});
