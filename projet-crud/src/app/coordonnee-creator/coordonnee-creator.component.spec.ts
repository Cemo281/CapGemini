import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneeCreatorComponent } from './coordonnee-creator.component';

describe('CoordonneeCreatorComponent', () => {
  let component: CoordonneeCreatorComponent;
  let fixture: ComponentFixture<CoordonneeCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordonneeCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordonneeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
