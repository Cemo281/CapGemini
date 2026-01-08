import { Component, ViewChild } from '@angular/core';
import { CoordonneeDTO } from '../../models/CoordonneeDTO';
import { CoordonneeService } from '../../services/coordonnee-service.service';
import { CoordonneeCreatorComponent } from '../../coordonnee-creator/coordonnee-creator.component';
import { CoordonneeListComponent } from '../../coordonnee-list/coordonnee-list.component';
import {RouterLinkActive} from "@angular/router";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-coordonnees',
  standalone: true,
  imports: [CommonModule, CoordonneeCreatorComponent, CoordonneeListComponent, RouterLinkActive, RouterModule],
  templateUrl: './coordonnees.component.html',
  styleUrl: './coordonnees.component.css'
})
export class CoordonneesComponent {
  @ViewChild(CoordonneeListComponent) listComponent!: CoordonneeListComponent;

  constructor(private coordonneeService: CoordonneeService, public auth: AuthService) {}

  addCoordonnee(newCoordonnee: CoordonneeDTO) {
    console.log('addCoordonnee called in parent component');
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }
}
