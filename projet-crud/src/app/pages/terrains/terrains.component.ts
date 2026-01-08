import { Component, ViewChild } from '@angular/core';
import { TerrainDTO } from '../../models/TerrainDTO';
import { TerrainService } from '../../services/terrain-service.service';
import { TerrainCreatorComponent } from '../../terrain-creator/terrain-creator.component';
import { TerrainListComponent } from '../../terrain-list/terrain-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-terrains',
  standalone: true,
  imports: [CommonModule, TerrainCreatorComponent, TerrainListComponent, RouterModule],
  templateUrl: './terrains.component.html',
  styleUrl: './terrains.component.css'
})
export class TerrainsComponent {
  @ViewChild(TerrainListComponent) listComponent!: TerrainListComponent;

  constructor(private terrainService: TerrainService, public auth: AuthService) {}

  addTerrain(newTerrain: TerrainDTO) {
    console.log('addTerrain called in parent component');
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }
}
