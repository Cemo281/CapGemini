import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { TerrainService } from '../services/terrain-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-terrain-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terrain-list.component.html',
  styleUrl: './terrain-list.component.css'
})
export class TerrainListComponent implements OnInit {
  terrains: TerrainDTO[] = [];
  loading = true;
  error: string | null = null;
  editingId: number | null = null;
  editing: TerrainDTO | null = null;
  @Output() terrainDeleted = new EventEmitter<number>();

  constructor(private terrainService: TerrainService, public auth: AuthService) {}

  ngOnInit() {
    console.log('TerrainListComponent initialized, calling loadTerrains()');
    this.loadTerrains();
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

  startEdit(terrain: TerrainDTO) {
    this.editingId = terrain.id || null;
    this.editing = { ...terrain, coordonnees: { ...terrain.coordonnees } } as TerrainDTO;
  }

  cancelEdit() {
    this.editingId = null;
    this.editing = null;
  }

  saveEdit(id: number | undefined) {
    if (!this.editing || id === undefined) return;
    this.terrainService.updateTerrain(id, this.editing).subscribe({
      next: (updated) => {
        console.log('Terrain mis à jour', updated);
        this.cancelEdit();
        this.loadTerrains();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        this.error = 'Failed to update: ' + err.message;
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
