import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightPrice } from './highlight-price';

@Component({
  selector: 'app-wrapper',
  imports: [HighlightPrice],
  template: '<div [appHighlightPrice]="price()">{{ price() }}</div>',
})
class Wrapper {
  price = signal(0);
}

describe('HighlightPrice', () => {
  let fixture: ComponentFixture<Wrapper>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wrapper],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Wrapper);
    fixture.detectChanges();

    hostElement = fixture.debugElement.query(By.directive(HighlightPrice)).nativeElement;
  });

  it('should have class "text-body-tertiary fst-italic" when price equal 0', () => {
    expect(hostElement.className).toContain('text-body-tertiary');
    expect(hostElement.className).toContain('fst-italic');
  });

  it('should have class "text-body-secondary" when price is less than 50', () => {
    fixture.componentInstance.price.set(49);
    fixture.detectChanges();

    expect(hostElement.className).toContain('text-body-secondary');
    expect(hostElement.className).not.toContain('fst-italic');
  });

  it('should have class "text-body-emphasis" when the price is greater than or equal to 50', () => {
    fixture.componentInstance.price.set(50);
    fixture.detectChanges();

    expect(hostElement.className).toContain('text-body-emphasis');
    expect(hostElement.className).not.toContain('fst-italic');
  });
});
