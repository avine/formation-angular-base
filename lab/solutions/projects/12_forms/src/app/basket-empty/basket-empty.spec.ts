import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketEmpty } from './basket-empty';

describe('BasketEmpty', () => {
  let component: BasketEmpty;
  let fixture: ComponentFixture<BasketEmpty>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasketEmpty],
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(BasketEmpty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
