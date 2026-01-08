import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { TerrainService } from '../services/terrain-service.service';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terrain-creator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './terrain-creator.component.html',
  styleUrls: ['./terrain-creator.component.css']
})
export class TerrainCreatorComponent implements OnChanges {
  @Input() terrainToEdit: TerrainDTO | null = null;
  @Output() terrainCreated = new EventEmitter<TerrainDTO>();

  form: FormGroup;
  errorMessage: string | null = null;

  constructor(private terrainService: TerrainService, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      quantite: ['', [Validators.required, this.positiveNumberValidator.bind(this)]],
      description: ['', Validators.required],
      latitude: ['', [Validators.required, this.latitudeValidator.bind(this)]],
      longitude: ['', [Validators.required, this.longitudeValidator.bind(this)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['terrainToEdit'] && this.terrainToEdit) {
      // Edit mode
      this.form.patchValue({
        id: this.terrainToEdit.id,
        nom: this.terrainToEdit.nom,
        quantite: this.terrainToEdit.quantite,
        description: this.terrainToEdit.description,
        latitude: this.terrainToEdit.coordonnees?.latitude || '',
        longitude: this.terrainToEdit.coordonnees?.longitude || ''
      });
    } else if (changes['terrainToEdit'] && !this.terrainToEdit) {
      this.resetForm();
    }
  }

  positiveNumberValidator(control: any): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return { invalidNumber: true };
    }
    if (value <= 0) {
      return { notPositive: true };
    }
    return null;
  }

  latitudeValidator(control: any): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return { invalidNumber: true };
    }
    if (value < -90 || value > 90) {
      return { latitudeRange: { min: -90, max: 90, value } };
    }
    return null;
  }

  longitudeValidator(control: any): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return { invalidNumber: true };
    }
    if (value < -180 || value > 180) {
      return { longitudeRange: { min: -180, max: 180, value } };
    }
    return null;
  }

  submitForm() {
    this.errorMessage = null;
    if (!this.form.valid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire';
      return;
    }

    const formValue = this.form.value;
    const coordData: CoordonneeDTO = {
      latitude: formValue.latitude,
      longitude: formValue.longitude
    };

    const terrainData: TerrainDTO = {
      nom: formValue.nom,
      quantite: Number(formValue.quantite),
      description: formValue.description,
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

    if (formValue.id) {
      this.terrainService.updateTerrain(formValue.id, terrainData).subscribe(observer);
    } else {
      this.terrainService.createTerrain(terrainData).subscribe(observer);
    }
  }

  resetForm() {
    this.form.reset();
    this.errorMessage = null;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

    if (fieldName === 'nom') {
      if (field.errors['required']) return 'Le nom est requis';
      if (field.errors['minlength']) return 'Minimum 2 caractères';
    }
    if (fieldName === 'quantite') {
      if (field.errors['required']) return 'La quantité est requise';
      if (field.errors['invalidNumber']) return 'Veuillez entrer un nombre valide';
      if (field.errors['notPositive']) return 'La quantité doit être supérieure à 0';
    }
    if (fieldName === 'description') {
      if (field.errors['required']) return 'La description est requise';
    }
    if (fieldName === 'latitude') {
      if (field.errors['required']) return 'La latitude est requise';
      if (field.errors['invalidNumber']) return 'Veuillez entrer un nombre valide';
      if (field.errors['latitudeRange']) return 'La latitude doit être entre -90 et 90';
    }
    if (fieldName === 'longitude') {
      if (field.errors['required']) return 'La longitude est requise';
      if (field.errors['invalidNumber']) return 'Veuillez entrer un nombre valide';
      if (field.errors['longitudeRange']) return 'La longitude doit être entre -180 et 180';
    }
    return '';
  }
}