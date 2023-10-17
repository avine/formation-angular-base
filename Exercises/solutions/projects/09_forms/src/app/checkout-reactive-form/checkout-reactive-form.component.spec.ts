import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../basket/basket.service';
import { BasketStubService } from '../basket/basket.service.stub';
import { CheckoutReactiveFormComponent } from './checkout-reactive-form.component';

describe('CheckoutReactiveFormComponent', () => {
  let component: CheckoutReactiveFormComponent;
  let fixture: ComponentFixture<CheckoutReactiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: BasketService, useClass: BasketStubService }],
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
