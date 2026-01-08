import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { UtilisateurService } from '../services/utilisateur-service.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateur-creator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './utilisateur-creator.component.html',
  styleUrls: ['./utilisateur-creator.component.css']
})
export class UtilisateurCreatorComponent implements OnChanges {
  @Input() utilisateurToEdit: UtilisateurDTO | null = null;
  @Output() utilisateurCreated = new EventEmitter<UtilisateurDTO>();

  id: number | undefined;
  nom = '';
  prenom = '';
  mail = '';
  password = '';
  username = '';
  role = 'USER';
  errorMessage: string | null = null;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['utilisateurToEdit'] && this.utilisateurToEdit) {
      this.id = this.utilisateurToEdit.id;
      this.nom = this.utilisateurToEdit.nom;
      this.prenom = this.utilisateurToEdit.prenom || '';
      this.mail = this.utilisateurToEdit.mail;
      this.username = this.utilisateurToEdit.username;
      this.role = this.utilisateurToEdit.role || 'USER';
      this.password = ''; // Don't pre-fill password
    } else if (changes['utilisateurToEdit'] && !this.utilisateurToEdit) {
      this.resetForm();
    }
  }

  submitForm(form: NgForm) {
    this.errorMessage = null;
    const userData: UtilisateurDTO = {
      nom: this.nom,
      prenom: this.prenom,
      mail: this.mail,
      password: this.password,
      username: this.username,
      role: this.role,
      terrains: []
    };

    const observer = {
        next: (utilisateur: UtilisateurDTO) => {
          this.utilisateurCreated.emit(utilisateur);
          this.resetForm();
        },
        error: (err: Error) => {
            console.error('Erreur', err);
            this.errorMessage = err.message || "Une erreur est survenue";
        }
    };

    if (this.id) {
      this.utilisateurService.updateUtilisateur(this.id, userData).subscribe(observer);
    } else {
      this.utilisateurService.createUtilisateur(userData).subscribe(observer);
    }
  }

  resetForm() {
    this.id = undefined;
    this.nom = '';
    this.prenom = '';
    this.mail = '';
    this.password = '';
    this.username = '';
    this.role = 'USER';
    this.errorMessage = null;
  }
}
