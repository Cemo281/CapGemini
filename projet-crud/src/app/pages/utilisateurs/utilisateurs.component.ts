import { Component, ViewChild } from '@angular/core';
import { UtilisateurDTO } from '../../models/UtilisateurDTO';
import { UtilisateurService } from '../../services/utilisateur-service.service';
import { UtilisateurCreatorComponent } from '../../utilisateur-creator/utilisateur-creator.component';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [UtilisateurCreatorComponent, UtilisateurListComponent, CommonModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {
  @ViewChild(UtilisateurListComponent) listComponent!: UtilisateurListComponent;
  showModal = false;
  selectedUtilisateur: UtilisateurDTO | null = null;

  constructor(private utilisateurService: UtilisateurService) {}

  openModal(item?: UtilisateurDTO) {
    this.selectedUtilisateur = item || null;
    this.showModal = true;
  }

  closeModal(event?: Event) {
    this.showModal = false;
    this.selectedUtilisateur = null;
  }

  onUtilisateurCreated(newUtilisateur: UtilisateurDTO) {
    this.showModal = false;
    this.selectedUtilisateur = null;
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }

  addUtilisateur(newUtilisateur: UtilisateurDTO) {
    this.onUtilisateurCreated(newUtilisateur);
  }
}
