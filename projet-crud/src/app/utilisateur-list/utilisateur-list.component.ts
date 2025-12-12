import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { UtilisateurService } from '../services/utilisateur-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: UtilisateurDTO[] = [];
  loading = true;
  error: string | null = null;
  @Output() utilisateurDeleted = new EventEmitter<number>();

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    console.log('UtilisateurListComponent initialized, calling loadUtilisateurs()');
    this.loadUtilisateurs();
  }

  loadUtilisateurs() {
    this.loading = true;
    this.error = null;
    console.log('loadUtilisateurs() called');
    
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (utilisateurs) => {
        console.log('Successfully loaded utilisateurs:', utilisateurs);
        this.utilisateurs = utilisateurs;
        this.loading = false;
        console.log('utilisateurs array updated, length:', this.utilisateurs.length);
      },
      error: (err) => {
        console.error('Error loading utilisateurs:', err);
        this.error = 'Failed to load utilisateurs: ' + err.message;
        this.loading = false;
      }
    });
  }

  refreshList() {
    console.log('refreshList() called from parent');
    this.loadUtilisateurs();
  }

  deleteUtilisateur(id: number | undefined) {
    if (id === undefined) {
      console.error('ID est undefined');
      return;
    }
    console.log('Deleting utilisateur with id:', id);
    this.utilisateurService.deleteUtilisateur(id).subscribe({
      next: () => {
        console.log('Utilisateur supprimé');
        this.utilisateurDeleted.emit(id);
        this.loadUtilisateurs();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        this.error = 'Failed to delete: ' + err.message;
      }
    });
  }
}
