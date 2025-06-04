import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Basket } from './basket';
import { BasketResource } from './basket-resource';
import { BasketResourceStub } from './basket-resource.stub';

describe('Basket', () => {
  let component: Basket;
  let fixture: ComponentFixture<Basket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basket],
      providers: [provideRouter([]), { provide: BasketResource, useClass: BasketResourceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(Basket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
