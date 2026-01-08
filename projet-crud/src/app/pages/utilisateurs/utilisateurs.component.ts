import { Component, ViewChild } from '@angular/core';
import { UtilisateurDTO } from '../../models/UtilisateurDTO';
import { UtilisateurService } from '../../services/utilisateur-service.service';
import { UtilisateurCreatorComponent } from '../../utilisateur-creator/utilisateur-creator.component';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, UtilisateurCreatorComponent, UtilisateurListComponent, RouterModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {
  @ViewChild(UtilisateurListComponent) listComponent!: UtilisateurListComponent;

  constructor(private utilisateurService: UtilisateurService, public auth: AuthService) {}

  addUtilisateur(newUtilisateur: UtilisateurDTO) {
    console.log('addUtilisateur called in parent component');
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }
}
