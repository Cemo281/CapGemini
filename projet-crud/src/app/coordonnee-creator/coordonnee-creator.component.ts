import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { CoordonneeService } from '../services/coordonnee-service.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordonnee-creator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coordonnee-creator.component.html',
  styleUrl: './coordonnee-creator.component.css'
})
export class CoordonneeCreatorComponent implements OnChanges {
  @Input() coordonneeToEdit: CoordonneeDTO | null = null;
  @Output() coordonneeCreated = new EventEmitter<CoordonneeDTO>();

  id: number | undefined;
  latitude = '';
  longitude = '';
  errorMessage: string | null = null;

  constructor(private coordonneeService: CoordonneeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['coordonneeToEdit'] && this.coordonneeToEdit) {
      this.id = this.coordonneeToEdit.id;
      this.latitude = this.coordonneeToEdit.latitude;
      this.longitude = this.coordonneeToEdit.longitude;
    } else if (changes['coordonneeToEdit'] && !this.coordonneeToEdit) {
      this.resetForm();
    }
  }

  submitForm(form: NgForm) {
    this.errorMessage = null;
    const coordData: CoordonneeDTO = {
      latitude: this.latitude,
      longitude: this.longitude
    };

    const observer = {
        next: (coordonnee: CoordonneeDTO) => {
          this.coordonneeCreated.emit(coordonnee);
          this.resetForm();
        },
        error: (err: Error) => {
            console.error('Erreur', err);
            this.errorMessage = err.message || "Une erreur est survenue";
        }
    };

    if (this.id) {
      this.coordonneeService.updateCoordonnee(this.id, coordData).subscribe(observer);
    } else {
      this.coordonneeService.createCoordonnee(coordData).subscribe(observer);
    }
  }

  resetForm() {
    this.id = undefined;
    this.latitude = '';
    this.longitude = '';
    this.errorMessage = null;
  }
}
