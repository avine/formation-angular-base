import { of } from 'rxjs';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', { getProduct: of(new Product('', '', '', '', 0, 0)) }),
        },
      ],
    }).compileComponents();
    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
