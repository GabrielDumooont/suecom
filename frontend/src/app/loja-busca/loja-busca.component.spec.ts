import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaBuscaComponent } from './loja-busca.component';

describe('LojaBuscaComponent', () => {
  let component: LojaBuscaComponent;
  let fixture: ComponentFixture<LojaBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaBuscaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LojaBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
