import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { BasketComponent } from './basket.component';

class CustomerServiceMock {
  getBasket() {
    return of();
  }
}

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [RouterModule.forRoot([], { useHash: true })],
      providers: [{ provide: CustomerService, useClass: CustomerServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
