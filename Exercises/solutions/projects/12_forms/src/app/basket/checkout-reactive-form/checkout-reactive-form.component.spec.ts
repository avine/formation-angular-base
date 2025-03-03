import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketService } from '../basket.service';
import { BasketStubService } from '../basket.service.stub';
import { CheckoutReactiveFormComponent } from './checkout-reactive-form.component';

describe('CheckoutReactiveFormComponent', () => {
  let component: CheckoutReactiveFormComponent;
  let fixture: ComponentFixture<CheckoutReactiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutReactiveFormComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketService, useClass: BasketStubService },
      ],
    });
    fixture = TestBed.createComponent(CheckoutReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
