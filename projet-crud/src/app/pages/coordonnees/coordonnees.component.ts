import { Component, ViewChild } from '@angular/core';
import { CoordonneeDTO } from '../../models/CoordonneeDTO';
import { CoordonneeService } from '../../services/coordonnee-service.service';
import { CoordonneeCreatorComponent } from '../../coordonnee-creator/coordonnee-creator.component';
import { CoordonneeListComponent } from '../../coordonnee-list/coordonnee-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordonnees',
  standalone: true,
  imports: [CoordonneeCreatorComponent, CoordonneeListComponent, CommonModule],
  templateUrl: './coordonnees.component.html',
  styleUrl: './coordonnees.component.css'
})
export class CoordonneesComponent {
  @ViewChild(CoordonneeListComponent) listComponent!: CoordonneeListComponent;
  showModal = false;
  selectedCoordonnee: CoordonneeDTO | null = null;

  constructor(private coordonneeService: CoordonneeService) {}

  openModal(item?: CoordonneeDTO) {
    this.selectedCoordonnee = item || null;
    this.showModal = true;
  }

  closeModal(event?: Event) {
    this.showModal = false;
    this.selectedCoordonnee = null;
  }

  onCoordonneeCreated(newCoordonnee: CoordonneeDTO) {
    this.showModal = false;
    this.selectedCoordonnee = null;
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }

  addCoordonnee(newCoordonnee: CoordonneeDTO) {
    this.onCoordonneeCreated(newCoordonnee);
  }
}
