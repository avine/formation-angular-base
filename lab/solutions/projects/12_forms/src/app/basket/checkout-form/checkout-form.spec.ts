import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketResource } from '../basket-resource';
import { BasketResourceMock } from '../basket-resource.mock';
import { CheckoutForm } from './checkout-form';

describe('CheckoutForm', () => {
  let component: CheckoutForm;
  let fixture: ComponentFixture<CheckoutForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutForm],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketResource, useClass: BasketResourceMock },
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
