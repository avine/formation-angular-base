import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';

describe('AppComponent (first approach - with explicit dependency declaration)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MenuComponent, ProductComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.directive(ProductComponent));
    productDebugElements.forEach((productDebugElement, index) => {
      const productComponent: ProductComponent = productDebugElement.componentInstance;
      expect(productComponent.product).toBe(component.products[index]);
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
    const productDebugElements = fixture.debugElement.queryAll(By.directive(ProductComponent));
    const productComponent: ProductComponent = productDebugElements[1].componentInstance;
    productComponent.addToBasket.emit(productComponent.product);
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
