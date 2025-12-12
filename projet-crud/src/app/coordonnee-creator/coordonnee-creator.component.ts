import { Component, EventEmitter, Output } from '@angular/core';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { CoordonneeService } from '../services/coordonnee-service.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-coordonnee-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coordonnee-creator.component.html',
  styleUrl: './coordonnee-creator.component.css'
})
export class CoordonneeCreatorComponent {
  latitude = '';
  longitude = '';

  @Output() coordonneeCreated = new EventEmitter<CoordonneeDTO>();

  constructor(private coordonneeService: CoordonneeService) {}

  createCoordonnee(form: NgForm) {
    const newCoordonnee: CoordonneeDTO = {
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.coordonneeService.createCoordonnee(newCoordonnee).subscribe({
      next: (coordonnee) => {
        console.log('Coordonnée créée:', coordonnee);
        alert(`✓ Coordonnée créée avec succès (${coordonnee.latitude}, ${coordonnee.longitude})`);
        this.coordonneeCreated.emit(coordonnee);
        form.resetForm();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la création de la coordonnée', err);
        alert(`✗ Erreur lors de la création: ${err.message}`);
      }
    });
  }

  resetForm() {
    this.latitude = '';
    this.longitude = '';
  }
}
