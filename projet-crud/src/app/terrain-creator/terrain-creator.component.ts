import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { TerrainService } from '../services/terrain-service.service';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terrain-creator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './terrain-creator.component.html',
  styleUrls: ['./terrain-creator.component.css']
})
export class TerrainCreatorComponent implements OnChanges {
  @Input() terrainToEdit: TerrainDTO | null = null;
  @Output() terrainCreated = new EventEmitter<TerrainDTO>();

  id: number | undefined;
  nom = '';
  quantite = '';
  description = '';
  latitude = '';
  longitude = '';
  errorMessage: string | null = null;

  constructor(private terrainService: TerrainService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['terrainToEdit'] && this.terrainToEdit) {
      // Edit mode
      this.id = this.terrainToEdit.id;
      this.nom = this.terrainToEdit.nom;
      this.quantite = this.terrainToEdit.quantite.toString();
      this.description = this.terrainToEdit.description;
      
      if (this.terrainToEdit.coordonnees) {
        this.latitude = this.terrainToEdit.coordonnees.latitude;
        this.longitude = this.terrainToEdit.coordonnees.longitude;
      }
    } else if (changes['terrainToEdit'] && !this.terrainToEdit) {
      this.resetForm();
    }
  }

  submitForm(form: NgForm) {
    this.errorMessage = null;
    
    const coordData: CoordonneeDTO = {
        latitude: this.latitude,
        longitude: this.longitude
    };

    const terrainData: TerrainDTO = {
      nom: this.nom,
      quantite: Number(this.quantite),
      description: this.description,
      coordonnees: coordData
    };

    const observer = {
        next: (terrain: TerrainDTO) => {
          this.terrainCreated.emit(terrain);
          this.resetForm();
        },
        error: (err: Error) => {
          console.error('Erreur', err);
          this.errorMessage = err.message || "Une erreur est survenue";
        }
    };

    if (this.id) {
      this.terrainService.updateTerrain(this.id, terrainData).subscribe(observer);
    } else {
      this.terrainService.createTerrain(terrainData).subscribe(observer);
    }
  }

  resetForm() {
    this.id = undefined;
    this.nom = '';
    this.quantite = '';
    this.description = '';
    this.latitude = '';
    this.longitude = '';
    this.errorMessage = null;
  }
}