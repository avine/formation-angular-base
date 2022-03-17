import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Product } from '../model/product';
import { CustomerService } from '../services/customer.service';
import { BasketComponent } from './basket.component';

const testProducts = [new Product('', 'test1', '', '', 0, 42), new Product('', 'test2', '', '', 0, 666)];

class CustomerServiceMock {
  getBasket() {
    return of();
  }
}

const waitValidation = async (fixture: any) => {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
};

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [RouterModule.forRoot([], { useHash: true }), FormsModule],
      providers: [{ provide: CustomerService, useClass: CustomerServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the basket detail', () => {
    component.basket = testProducts;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.list-group-item');
    Array.prototype.forEach.call(items, (item, i) => {
      expect(item.textContent).toContain(testProducts[i].title);
      expect(item.textContent).toContain(testProducts[i].price);
    });
  });

  it('should add has-error class when name is invalid', async () => {
    component.customer.name = 'something';
    await waitValidation(fixture);

    const nameFormGroup = fixture.nativeElement.querySelectorAll('.form-group')[0];

    expect(nameFormGroup.classList.contains('has-error')).toBe(false);

    component.customer.name = '';
    await waitValidation(fixture);

    expect(nameFormGroup.classList.contains('has-error')).toBe(true);
  });

  it('should add has-error class when address is invalid', async () => {
    component.customer.address = 'something';
    await waitValidation(fixture);

    const addressFormGroup = fixture.nativeElement.querySelector('.form-group:nth-child(2)');

    expect(addressFormGroup.classList.contains('has-error')).toBe(false);

    component.customer.address = '';
    await waitValidation(fixture);

    expect(addressFormGroup.classList.contains('has-error')).toBe(true);
  });

  it('should add has-error class when creditCard is invalid', async () => {
    component.customer.creditCard = 'something';
    await waitValidation(fixture);

    const creditCardFormGroup = fixture.nativeElement.querySelectorAll('.form-group')[2];

    expect(creditCardFormGroup.classList.contains('has-error')).toBe(true);

    component.customer.creditCard = '123-456';
    await waitValidation(fixture);

    expect(creditCardFormGroup.classList.contains('has-error')).toBe(false);
  });

  it('should add disable submit button when form is invalid', async () => {
    const button = fixture.nativeElement.querySelector('button');

    component.customer = { name: 'something', address: 'somehting', creditCard: '123-456' };
    await waitValidation(fixture);

    expect(button.disabled).toBe(false);

    component.customer.name = '';
    await waitValidation(fixture);

    expect(button.disabled).toBe(true);

    component.customer.name = 'something';
    component.customer.creditCard = 'something';
    await waitValidation(fixture);

    expect(button.disabled).toBe(true);
  });
});
