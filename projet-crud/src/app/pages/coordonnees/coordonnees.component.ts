import { Component, ViewChild } from '@angular/core';
import { CoordonneeDTO } from '../../models/CoordonneeDTO';
import { CoordonneeService } from '../../services/coordonnee-service.service';
import { CoordonneeCreatorComponent } from '../../coordonnee-creator/coordonnee-creator.component';
import { CoordonneeListComponent } from '../../coordonnee-list/coordonnee-list.component';

@Component({
  selector: 'app-coordonnees',
  standalone: true,
  imports: [CoordonneeCreatorComponent, CoordonneeListComponent],
  templateUrl: './coordonnees.component.html',
  styleUrl: './coordonnees.component.css'
})
export class CoordonneesComponent {
  @ViewChild(CoordonneeListComponent) listComponent!: CoordonneeListComponent;

  constructor(private coordonneeService: CoordonneeService) {}

  addCoordonnee(newCoordonnee: CoordonneeDTO) {
    console.log('addCoordonnee called in parent component');
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }
}
