import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur-service.service';
import { AuthService } from '../auth/auth.service';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: UtilisateurDTO[] = [];
  loading = false;
  error = '';
  isAdmin$: Observable<boolean>;
  
  @Output() utilisateurDeleted = new EventEmitter<number>();
  @Output() addRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<UtilisateurDTO>();

  constructor(private utilisateurService: UtilisateurService, private authService: AuthService) {
    this.isAdmin$ = this.authService.role$.pipe(
      map(role => role === 'ADMIN' || role === 'admin')
    );
  }

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  onAddClick() {
    this.addRequest.emit();
  }
  
  onEditClick(item: UtilisateurDTO) {
    this.editRequest.emit(item);
  }

  loadUtilisateurs() {
    this.loading = true;
    this.error = '';
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }

  refreshList(): void {
    this.loadUtilisateurs();
  }

  deleteUtilisateur(id: number | undefined) {
    if (id === undefined) return;
    
    this.utilisateurService.deleteUtilisateur(id).subscribe({
      next: () => {
        this.utilisateurDeleted.emit(id);
        this.loadUtilisateurs();
      },
      error: (err) => {
        this.error = 'Erreur lors de la suppression';
      }
    });
  }
}