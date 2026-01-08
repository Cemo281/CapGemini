import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { TerrainService } from '../services/terrain-service.service';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-terrain-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terrain-list.component.html',
  styleUrl: './terrain-list.component.css'
})
export class TerrainListComponent implements OnInit {
  terrains: TerrainDTO[] = [];
  loading = true;
  error: string | null = null;
  isAdmin$: Observable<boolean>;
  @Output() terrainDeleted = new EventEmitter<number>();
  @Output() addRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<TerrainDTO>();

  constructor(private terrainService: TerrainService, private authService: AuthService) {
    this.isAdmin$ = this.authService.role$.pipe(
      map(role => {
        const isAdmin = role === 'ADMIN' || role === 'admin';
        console.log('TerrainListComponent - role changed to:', role, '- isAdmin:', isAdmin);
        return isAdmin;
      })
    );
    console.log('TerrainListComponent constructor - isAdmin$ Observable created');
  }

  ngOnInit() {
    console.log('TerrainListComponent initialized, calling loadTerrains()');
    this.loadTerrains();
  }

  onAddClick() {
    this.addRequest.emit();
  }

  onEditClick(terrain: TerrainDTO) {
    console.log("Edit requested for", terrain);
    this.editRequest.emit(terrain);
  }

  loadTerrains() {
    this.loading = true;
    this.error = null;
    console.log('loadTerrains() called');
    
    this.terrainService.getTerrains().subscribe({
      next: (terrains) => {
        console.log('Successfully loaded terrains:', terrains);
        this.terrains = terrains;
        this.loading = false;
        console.log('terrains array updated, length:', this.terrains.length);
      },
      error: (err) => {
        console.error('Error loading terrains:', err);
        this.error = 'Failed to load terrains: ' + err.message;
        this.loading = false;
      }
    });
  }

  refreshList() {
    console.log('refreshList() called from parent');
    this.loadTerrains();
  }

  deleteTerrain(id: number | undefined) {
    if (id === undefined) {
      console.error('ID est undefined');
      return;
    }
    console.log('Deleting terrain with id:', id);
    this.terrainService.deleteTerrain(id).subscribe({
      next: () => {
        console.log('Terrain supprimé');
        this.terrainDeleted.emit(id);
        this.loadTerrains();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
        this.error = 'Failed to delete: ' + err.message;
      }
    });
  }
}
