import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { CoordonneeService } from '../services/coordonnee-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-coordonnee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coordonnee-list.component.html',
  styleUrl: './coordonnee-list.component.css'
})
export class CoordonneeListComponent implements OnInit {
  coordonnees: CoordonneeDTO[] = [];
  loading = true;
  error: string | null = null;
  editingId: number | null = null;
  editing: CoordonneeDTO | null = null;
  @Output() coordonneeDeleted = new EventEmitter<number>();

  constructor(private coordonneeService: CoordonneeService, public auth: AuthService) {}

  ngOnInit() {
    console.log('CoordonneeListComponent initialized, calling loadCoordonnees()');
    this.loadCoordonnees();
  }

  loadCoordonnees() {
    this.loading = true;
    this.error = null;
    console.log('loadCoordonnees() called');
    
    this.coordonneeService.getCoordonnees().subscribe({
      next: (coordonnees) => {
        console.log('Successfully loaded coordonnees:', coordonnees);
        this.coordonnees = coordonnees;
        this.loading = false;
        console.log('coordonnees array updated, length:', this.coordonnees.length);
      },
      error: (err) => {
        console.error('Error loading coordonnees:', err);
        this.error = 'Failed to load coordonnees: ' + err.message;
        this.loading = false;
      }
    });
  }

  startEdit(coordonnee: CoordonneeDTO) {
    this.editingId = coordonnee.id || null;
    this.editing = { ...coordonnee };
  }

  cancelEdit() {
    this.editingId = null;
    this.editing = null;
  }

  saveEdit(id: number | undefined) {
    if (!this.editing || id === undefined) return;
    this.coordonneeService.updateCoordonnee(id, this.editing).subscribe({
      next: (updated) => {
        console.log('Coordonnée mise à jour', updated);
        this.cancelEdit();
        this.loadCoordonnees();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        this.error = 'Failed to update: ' + err.message;
      }
    });
  }

  refreshList() {
    console.log('refreshList() called from parent');
    this.loadCoordonnees();
  }

  deleteCoordonnee(id: number | undefined) {
    if (id === undefined) {
      console.error('ID est undefined');
      return;
    }
    console.log('Deleting coordonnee with id:', id);
    this.coordonneeService.deleteCoordonnee(id).subscribe({
      next: () => {
        console.log('Coordonnée supprimée');
        this.coordonneeDeleted.emit(id);
        this.loadCoordonnees();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        this.error = 'Failed to delete: ' + err.message;
      }
    });
  }
}
