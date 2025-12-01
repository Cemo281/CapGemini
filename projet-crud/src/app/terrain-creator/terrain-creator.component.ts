
import { Component, EventEmitter, Output } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { TerrainService } from '../services/terrain-service.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-terrain-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './terrain-creator.component.html',
  styleUrls: ['./terrain-creator.component.css']
})
export class TerrainCreatorComponent {
  nom = '';
  quantite = '';
  description = '';
  latitude = '';
  longitude = '';

  @Output() terrainCreated = new EventEmitter<TerrainDTO>();

  constructor(private terrainService: TerrainService) {}

  createTerrain(form: NgForm) {
    const newTerrain: TerrainDTO = {
      nom: this.nom,
      quantite: Number(this.quantite),
      description: this.description,
      coordonnees: {
        latitude: this.latitude,
        longitude: this.longitude
      }
    };

    this.terrainService.createTerrain(newTerrain).subscribe({
      next: (terrain) => {
        console.log('Terrain créé:', terrain);
        this.terrainCreated.emit(terrain);
        form.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la création du terrain', err);
      }
    });
  }

  resetForm() {
    this.nom = '';
    this.quantite = '';
    this.description = '';
    this.latitude = '';
    this.longitude = '';
  }
}
