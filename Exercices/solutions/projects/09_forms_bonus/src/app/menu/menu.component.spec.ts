import { RouterModule } from '@angular/router';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [ RouterModule.forRoot([], {useHash: true}) ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the header', () => {
    const brand = fixture.nativeElement.querySelector('.navbar-brand');
    expect(brand.textContent).toContain('Zenika');
  });
});
