import { Component } from '@angular/core';
import { TerrainCreatorComponent } from '../../terrain-creator/terrain-creator.component';
import { UtilisateurCreatorComponent } from '../../utilisateur-creator/utilisateur-creator.component';
import { TerrainDTO } from '../../models/TerrainDTO';
import { TerrainService } from '../../services/terrain-service.service';
import { UtilisateurDTO } from '../../models/UtilisateurDTO';  
import { UtilisateurService } from '../../services/utilisateur-service.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [TerrainCreatorComponent,UtilisateurCreatorComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  terrains: TerrainDTO[] = [];
  utilisateurs: UtilisateurDTO[] = [];

  constructor(private terrainService: TerrainService, private utilisateurService : UtilisateurService) {}  


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

  addUtilisateur(newUtilisateur: UtilisateurDTO) {
    this.utilisateurService.createUtilisateur(newUtilisateur).subscribe({
      next: (utilisateurSaved: UtilisateurDTO) => {
        this.utilisateurs.push(utilisateurSaved);
        console.log("Utilisateur créé :", utilisateurSaved);
      },
      error: (err: any) => {
        console.error("Erreur lors de la création de l'utilisateur :", err);
      }
    });
  }
}
