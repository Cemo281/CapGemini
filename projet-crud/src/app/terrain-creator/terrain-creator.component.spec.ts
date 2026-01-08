import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainCreatorComponent } from './terrain-creator.component';

describe('TerrainCreatorComponent', () => {
  let component: TerrainCreatorComponent;
  let fixture: ComponentFixture<TerrainCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerrainCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
