import { Component, ViewChild } from '@angular/core';
import { UtilisateurDTO } from '../../models/UtilisateurDTO';
import { UtilisateurService } from '../../services/utilisateur-service.service';
import { UtilisateurCreatorComponent } from '../../utilisateur-creator/utilisateur-creator.component';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [UtilisateurCreatorComponent, UtilisateurListComponent],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {
  @ViewChild(UtilisateurListComponent) listComponent!: UtilisateurListComponent;

  constructor(private utilisateurService: UtilisateurService) {}

  addUtilisateur(newUtilisateur: UtilisateurDTO) {
    console.log('addUtilisateur called in parent component');
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }
}
