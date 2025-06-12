import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Basket } from './basket';
import { BasketResource } from './basket-resource';
import { BasketResourceMock } from './basket-resource.mock';
import { CheckoutForm } from './checkout-form/checkout-form';
import { CheckoutReactiveForm } from './checkout-reactive-form/checkout-reactive-form';

describe('Basket', () => {
  let component: Basket;
  let fixture: ComponentFixture<Basket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basket],
      providers: [provideRouter([]), { provide: BasketResource, useClass: BasketResourceMock }],
    })
      .overrideComponent(Basket, {
        remove: {
          imports: [CheckoutForm, CheckoutReactiveForm],
        },
        add: {
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Basket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
