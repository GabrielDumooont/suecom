import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLojaComponent } from './layout-loja.component';

describe('LayoutLojaComponent', () => {
  let component: LayoutLojaComponent;
  let fixture: ComponentFixture<LayoutLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
