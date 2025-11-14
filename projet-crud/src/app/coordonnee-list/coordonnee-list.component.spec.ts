import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordonneeListComponent } from './coordonnee-list.component';

describe('CoordonneeListComponent', () => {
  let component: CoordonneeListComponent;
  let fixture: ComponentFixture<CoordonneeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordonneeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordonneeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
