import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCadastrarComponent } from './conta-cadastrar.component';

describe('ContaCadastrarComponent', () => {
  let component: ContaCadastrarComponent;
  let fixture: ComponentFixture<ContaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaCadastrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
