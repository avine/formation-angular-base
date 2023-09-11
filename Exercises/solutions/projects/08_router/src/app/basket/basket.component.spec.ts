import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../shared/services/api.service';
import { ApiStubService } from '../shared/services/api.service.stub';
import { BasketComponent } from './basket.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ApiService, useClass: ApiStubService }],
    });

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
