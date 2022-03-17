import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Product } from './model/product';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a total starting at 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.total).toEqual(0);
  });

  it('should have the total bound in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    app.total = 42;
    fixture.detectChanges();
    expect(compiled.querySelector('header')?.textContent).toContain(42);
  });

  it('should update price with the product price', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.total = 42;
    app.updatePrice(new Product('', '', '', 666));
    expect(app.total).toBe(42 + 666);
  });

  it('should bind each product component with its product', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    products.forEach((product: any, i) => {
      // ! FIXME: This test is hard to understand because product is an HTMLElement which does not expect a data property
      expect(product?.data).toBe(app.products[i]);
    });
  });
});
