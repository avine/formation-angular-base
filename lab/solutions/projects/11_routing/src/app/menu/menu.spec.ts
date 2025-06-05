import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BasketResource } from '../basket/basket-resource';
import { BasketResourceStub } from '../basket/basket-resource.stub';
import { BasketItem } from '../basket/basket-types';
import { Menu } from './menu';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter([]), { provide: BasketResource, useClass: BasketResourceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items', () => {
    // Given
    let numberOfItems = (fixture.nativeElement as HTMLElement).querySelector('.badge')?.textContent;
    expect(numberOfItems).toContain(0);

    // When
    (TestBed.inject(BasketResource) as unknown as BasketResourceStub).items.set([{} as BasketItem, {} as BasketItem]);
    fixture.detectChanges();

    // Then
    numberOfItems = (fixture.nativeElement as HTMLElement).querySelector('.badge')?.textContent;
    expect(numberOfItems).toContain(2);
  });
});
