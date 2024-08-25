import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCategoriaComponent } from './loja-categoria.component';

describe('LojaCategoriaComponent', () => {
  let component: LojaCategoriaComponent;
  let fixture: ComponentFixture<LojaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LojaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
