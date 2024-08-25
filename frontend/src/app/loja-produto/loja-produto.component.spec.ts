import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaProdutoComponent } from './loja-produto.component';

describe('LojaProdutoComponent', () => {
  let component: LojaProdutoComponent;
  let fixture: ComponentFixture<LojaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LojaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
