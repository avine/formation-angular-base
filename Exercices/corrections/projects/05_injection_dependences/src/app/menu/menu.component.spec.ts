import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  // let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the header', () => {
    const brand = (fixture.nativeElement as HTMLElement).querySelector('.navbar-brand');
    expect(brand?.textContent).toContain('Zenika');
  });
});
