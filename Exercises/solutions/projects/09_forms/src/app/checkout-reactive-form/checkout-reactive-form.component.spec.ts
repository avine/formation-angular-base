import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BasketService } from '../basket/basket.service';
import { BasketStubService } from '../basket/basket.service.stub';
import { ApiService } from '../shared/services/api.service';
import { ApiStubService } from '../shared/services/api.service.stub';
import { CheckoutReactiveFormComponent } from './checkout-reactive-form.component';

describe('CheckoutReactiveFormComponent', () => {
  let component: CheckoutReactiveFormComponent;
  let fixture: ComponentFixture<CheckoutReactiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ApiService, useClass: ApiStubService },
        { provide: BasketService, useClass: BasketStubService },
      ],
      declarations: [CheckoutReactiveFormComponent],
    });
    fixture = TestBed.createComponent(CheckoutReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
