import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketResource } from '../basket-resource';
import { BasketResourceMock } from '../basket-resource.mock';
import { CheckoutSignalForm } from './checkout-signal-form';

describe('CheckoutSignalForm', () => {
  let component: CheckoutSignalForm;
  let fixture: ComponentFixture<CheckoutSignalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutSignalForm],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketResource, useClass: BasketResourceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutSignalForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
