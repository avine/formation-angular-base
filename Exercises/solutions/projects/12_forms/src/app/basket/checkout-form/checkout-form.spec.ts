import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketResource } from '../basket-resource';
import { BasketResourceStub } from '../basket-resource.stub';
import { CheckoutForm } from './checkout-form';

describe('CheckoutForm', () => {
  let component: CheckoutForm;
  let fixture: ComponentFixture<CheckoutForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutForm],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketResource, useClass: BasketResourceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
