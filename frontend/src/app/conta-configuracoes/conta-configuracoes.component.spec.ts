import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaConfiguracoesComponent } from './conta-configuracoes.component';

describe('ContaConfiguracoesComponent', () => {
  let component: ContaConfiguracoesComponent;
  let fixture: ComponentFixture<ContaConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaConfiguracoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
