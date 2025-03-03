import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketService } from '../basket.service';
import { BasketStubService } from '../basket.service.stub';
import { CheckoutFormComponent } from './checkout-form.component';

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutFormComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketService, useClass: BasketStubService },
      ],
    });
    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
