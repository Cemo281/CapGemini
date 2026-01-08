import { Component, ViewChild } from '@angular/core';
import { TerrainDTO } from '../../models/TerrainDTO';
import { TerrainService } from '../../services/terrain-service.service';
import { TerrainCreatorComponent } from '../../terrain-creator/terrain-creator.component';
import { TerrainListComponent } from '../../terrain-list/terrain-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terrains',
  standalone: true,
  imports: [TerrainCreatorComponent, TerrainListComponent, CommonModule],
  templateUrl: './terrains.component.html',
  styleUrl: './terrains.component.css'
})
export class TerrainsComponent {
  @ViewChild(TerrainListComponent) listComponent!: TerrainListComponent;
  showModal = false;
  selectedTerrain: TerrainDTO | null = null;

  constructor(private terrainService: TerrainService) {}

  openModal(terrainToEdit?: TerrainDTO) {
    this.selectedTerrain = terrainToEdit || null;
    this.showModal = true;
  }

  closeModal(event?: Event) {
    if (event) {
      this.showModal = false;
      this.selectedTerrain = null;
    } else {
      this.showModal = false;
      this.selectedTerrain = null;
    }
  }

  onTerrainCreated(newTerrain: TerrainDTO) {
    console.log('Terrain created/updated, refreshing list...');
    this.showModal = false; 
    this.selectedTerrain = null;
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }

  addTerrain(newTerrain: TerrainDTO) {
    this.onTerrainCreated(newTerrain);
  }
}
