import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    // Define the required `product` property of the component
    component.product = {
      id: 'ID',
      title: 'title', // <-- in lowercase to test the `uppercase` pipe
      description: 'DESC',
      photo: 'PHOTO',
      price: 10,
      stock: 2,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display photo as image url', () => {
    const img = nativeElement.querySelector('img');
    expect(img?.src).toContain(component.product.photo);
  });

  it('should display product description', () => {
    const text = nativeElement.querySelector('small')?.textContent;
    expect(text).toContain(component.product.description);
  });

  it('should display product title in uppercase', () => {
    const text = nativeElement.querySelector('.card-link')?.textContent;
    expect(text).toContain(component.product.title.toUpperCase());
  });

  it('should display product price with currency', () => {
    const text = nativeElement.querySelector('.card-text')?.textContent;
    expect(text).toContain('$' + component.product.price); // <-- in the test we are still in '$' and 'en-US'
  });

  it('should emit addToBasket event with the given product when clicking on the button', () => {
    // Given
    const emitSpy = spyOn(component.addToBasket, 'emit');

    // When
    nativeElement.querySelector('button')?.click();

    // Then
    expect(emitSpy).toHaveBeenCalledWith(component.product);
  });

  it('should add a special className when stock equal 1', () => {
    // Given
    const card = nativeElement.querySelector('.card');
    expect(card?.className).not.toContain('text-bg-warning');

    // When
    component.product.stock = 1;
    fixture.detectChanges();

    // Then
    expect(card?.className).toContain('text-bg-warning');
  });
});
