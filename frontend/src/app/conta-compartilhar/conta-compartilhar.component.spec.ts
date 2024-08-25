import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCompartilharComponent } from './conta-compartilhar.component';

describe('ContaCompartilharComponent', () => {
  let component: ContaCompartilharComponent;
  let fixture: ComponentFixture<ContaCompartilharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaCompartilharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaCompartilharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
