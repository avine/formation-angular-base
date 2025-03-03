import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductComponent],
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    // Define the required `product` property of the component
    fixture.componentRef.setInput('product', {
      id: 'ID',
      title: 'TITLE',
      description: 'DESC',
      photo: 'PHOTO',
      price: 10,
      stock: 2,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product photo as image url', () => {
    const img = nativeElement.querySelector('img');
    expect(img?.src).toContain(component.product().photo);
  });

  it('should display the product description', () => {
    const text = nativeElement.querySelector('small')?.textContent;
    expect(text).toContain(component.product().description);
  });

  it('should display the product title', () => {
    const text = nativeElement.querySelector('.card-link')?.textContent;
    expect(text).toContain(component.product().title);
  });

  it('should display the product price', () => {
    const text = nativeElement.querySelector('.card-text')?.textContent;
    expect(text).toContain(component.product().price);
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    // Given
    const emitSpy = spyOn(component.addToBasket, 'emit');

    // When
    nativeElement.querySelector('button')?.click();

    // Then
    expect(emitSpy).toHaveBeenCalledWith(component.product());
  });

  it('should not add the "text-bg-warning" className when stock is greater than 1', () => {
    const card = nativeElement.querySelector('.card');
    expect(card?.className).not.toContain('text-bg-warning');
  });

  it('should add the "text-bg-warning" className when stock is equal to 1', () => {
    // Given
    const card = nativeElement.querySelector('.card');

    // When
    component.product().stock = 1;
    fixture.detectChanges();

    // Then
    expect(card?.className).toContain('text-bg-warning');
  });
});
