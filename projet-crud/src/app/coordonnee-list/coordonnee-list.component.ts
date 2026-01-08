import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { CoordonneeService } from '../services/coordonnee-service.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-coordonnee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordonnee-list.component.html',
  styleUrl: './coordonnee-list.component.css'
})
export class CoordonneeListComponent implements OnInit {
  coordonnees: CoordonneeDTO[] = [];
  loading = true;
  error: string | null = null;
  isAdmin$: Observable<boolean>;
  @Output() coordonneeDeleted = new EventEmitter<number>();
  @Output() addRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<CoordonneeDTO>();

  constructor(private coordonneeService: CoordonneeService, private authService: AuthService) {
    this.isAdmin$ = this.authService.role$.pipe(
      map(role => role === 'ADMIN' || role === 'admin')
    );
  }

  ngOnInit() {
    console.log('CoordonneeListComponent initialized, calling loadCoordonnees()');
    this.loadCoordonnees();
  }

  onAddClick() {
    this.addRequest.emit();
  }
  
  onEditClick(item: CoordonneeDTO) {
    this.editRequest.emit(item);
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
      error: (err: any) => {
        console.error('Erreur lors de la suppression', err);
        this.error = 'Failed to delete: ' + err.message;
      }
    });
  }
}
