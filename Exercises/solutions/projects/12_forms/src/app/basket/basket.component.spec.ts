import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';
import { BasketStubService } from './basket.service.stub';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { CheckoutReactiveFormComponent } from './checkout-reactive-form/checkout-reactive-form.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasketComponent],
      providers: [provideRouter([]), { provide: BasketService, useClass: BasketStubService }],
    }).overrideComponent(BasketComponent, {
      remove: {
        imports: [CheckoutFormComponent, CheckoutReactiveFormComponent],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
