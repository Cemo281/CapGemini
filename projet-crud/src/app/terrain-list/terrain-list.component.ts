import { Component, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { TerrainService } from '../services/terrain-service.service';
import { CommonModule } from '@angular/common';

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
  @Output() terrainDeleted = new EventEmitter<number>();

  constructor(private terrainService: TerrainService) {}

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
