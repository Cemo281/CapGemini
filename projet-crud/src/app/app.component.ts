import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilisateurDTO } from "./models/UtilisateurDTO";
import { TerrainDTO } from "./models/TerrainDTO";
import { CoordonneeDTO } from "./models/CoordonneeDTO";
import {TerrainCreatorComponent} from "./terrain-creator/terrain-creator.component"
import { UtilisateurListComponent } from "./utilisateur-list/utilisateur-list.component";

import { TerrainService } from "./services/terrain-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UtilisateurListComponent,
    TerrainCreatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // ----------- Données ----------------
  utilisateurs: UtilisateurDTO[] = [
    { id: 1, nom: 'Dupont', email: 'enfnje', password: 'pass123', userName: 'jdupont', terrains: [] },
    { id: 2, nom: 'Martin', email: 'sophmart', password: 'pass456', userName: 'smartin', terrains: [] },
    { id: 3, nom: 'Durand', email: 'pierduran', password: 'pass789', userName: 'pdurand', terrains: [] }
  ];

  terrains: TerrainDTO[] = [];

  constructor(private terrainService: TerrainService) {}

  addTerrain(newTerrain: TerrainDTO) {
    this.terrainService.createTerrain(newTerrain).subscribe({
      next: (terrainSaved: TerrainDTO) => {
        this.terrains.push(terrainSaved);
        console.log("Terrain créé :", terrainSaved);
      },
      error: (err: any) => {
        console.error("Erreur lors de la création du terrain :", err);
      }
    });
  }
}
