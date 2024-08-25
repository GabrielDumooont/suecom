import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaEntrarComponent } from './conta-entrar.component';

describe('ContaEntrarComponent', () => {
  let component: ContaEntrarComponent;
  let fixture: ComponentFixture<ContaEntrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaEntrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaEntrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
