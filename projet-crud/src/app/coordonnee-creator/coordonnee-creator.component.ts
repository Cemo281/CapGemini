import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CoordonneeDTO } from '../models/CoordonneeDTO';
import { CoordonneeService } from '../services/coordonnee-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordonnee-creator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './coordonnee-creator.component.html',
  styleUrl: './coordonnee-creator.component.css'
})
export class CoordonneeCreatorComponent implements OnChanges {
  @Input() coordonneeToEdit: CoordonneeDTO | null = null;
  @Output() coordonneeCreated = new EventEmitter<CoordonneeDTO>();

  form: FormGroup;
  errorMessage: string | null = null;

  constructor(private coordonneeService: CoordonneeService, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      latitude: ['', [Validators.required, this.latitudeValidator.bind(this)]],
      longitude: ['', [Validators.required, this.longitudeValidator.bind(this)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['coordonneeToEdit'] && this.coordonneeToEdit) {
      this.form.patchValue({
        id: this.coordonneeToEdit.id,
        latitude: this.coordonneeToEdit.latitude,
        longitude: this.coordonneeToEdit.longitude
      });
    } else if (changes['coordonneeToEdit'] && !this.coordonneeToEdit) {
      this.resetForm();
    }
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

    if (formValue.id) {
      this.coordonneeService.updateCoordonnee(formValue.id, coordData).subscribe(observer);
    } else {
      this.coordonneeService.createCoordonnee(coordData).subscribe(observer);
    }
  }

  resetForm() {
    this.form.reset();
    this.errorMessage = null;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

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
