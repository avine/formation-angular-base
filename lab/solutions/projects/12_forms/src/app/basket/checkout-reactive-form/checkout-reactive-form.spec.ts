import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketResource } from '../basket-resource';
import { BasketResourceMock } from '../basket-resource.mock';
import { CheckoutReactiveForm } from './checkout-reactive-form';

describe('CheckoutReactiveForm', () => {
  let component: CheckoutReactiveForm;
  let fixture: ComponentFixture<CheckoutReactiveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutReactiveForm],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketResource, useClass: BasketResourceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutReactiveForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
