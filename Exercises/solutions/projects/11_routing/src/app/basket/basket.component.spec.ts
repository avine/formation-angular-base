import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';
import { BasketStubService } from './basket.service.stub';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasketComponent],
      providers: [provideRouter([]), { provide: BasketService, useClass: BasketStubService }],
    });

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
