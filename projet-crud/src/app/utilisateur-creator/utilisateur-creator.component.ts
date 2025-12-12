import { Component, EventEmitter, Output } from '@angular/core';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { UtilisateurService } from '../services/utilisateur-service.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-utilisateur-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './utilisateur-creator.component.html',
  styleUrls: ['./utilisateur-creator.component.css']
})
export class UtilisateurCreatorComponent {
  nom = '';
  prenom = '';
  mail = '';
  password = '';
  username = '';
  role = 'USER';

  @Output() utilisateurCreated = new EventEmitter<UtilisateurDTO>();

  constructor(private utilisateurService: UtilisateurService) {}

  createUtilisateur(form: NgForm) {
    const newUtilisateur: UtilisateurDTO = {
      nom: this.nom,
      prenom: this.prenom,
      mail: this.mail,
      password: this.password,
      username: this.username,
      role: this.role,
      terrains: []
    };

    this.utilisateurService.createUtilisateur(newUtilisateur).subscribe({
      next: (utilisateur) => {
        console.log('Utilisateur créé:', utilisateur);
        alert(`✓ Utilisateur créé avec succès: ${utilisateur.username}`);
        this.utilisateurCreated.emit(utilisateur);
        form.resetForm();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'utilisateur', err);
        alert(`✗ Erreur lors de la création: ${err.message}`);
      }
    });
  }

  resetForm() {
    this.nom = '';
    this.prenom = '';
    this.mail = '';
    this.password = '';
    this.username = '';
    this.role = 'USER';
  }
}
