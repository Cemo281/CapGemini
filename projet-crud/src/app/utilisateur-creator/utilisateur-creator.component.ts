import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { UtilisateurService } from '../services/utilisateur-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateur-creator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './utilisateur-creator.component.html',
  styleUrls: ['./utilisateur-creator.component.css']
})
export class UtilisateurCreatorComponent implements OnChanges {
  @Input() utilisateurToEdit: UtilisateurDTO | null = null;
  @Output() utilisateurCreated = new EventEmitter<UtilisateurDTO>();

  form: FormGroup;
  errorMessage: string | null = null;
  isEditMode = false;

  constructor(private utilisateurService: UtilisateurService, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [undefined],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), this.passwordValidator.bind(this)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      role: ['USER', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['utilisateurToEdit']) {
      if (this.utilisateurToEdit) {
        this.isEditMode = true;
        this.form.patchValue({
          id: this.utilisateurToEdit.id,
          nom: this.utilisateurToEdit.nom,
          prenom: this.utilisateurToEdit.prenom || '',
          mail: this.utilisateurToEdit.mail,
          username: this.utilisateurToEdit.username,
          role: this.utilisateurToEdit.role || 'USER'
        });
        // En mode édition, le mot de passe n'est pas requis
        this.form.get('password')?.clearAsyncValidators();
        this.form.get('password')?.setValidators([Validators.minLength(8), this.passwordValidator.bind(this)]);
        this.form.get('password')?.updateValueAndValidity();
      } else {
        this.isEditMode = false;
        this.resetForm();
        // En mode création, le mot de passe est requis
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(8), this.passwordValidator.bind(this)]);
        this.form.get('password')?.updateValueAndValidity();
      }
    }
  }

  passwordValidator(control: any): { [key: string]: any } | null {
    if (!control.value) {
      return null; // Permet au validateur required de s'en charger
    }
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return {
        passwordStrength: {
          missingUpperCase: !hasUpperCase,
          missingLowerCase: !hasLowerCase,
          missingNumber: !hasNumber
        }
      };
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
    const userData: UtilisateurDTO = {
      nom: formValue.nom,
      prenom: formValue.prenom,
      mail: formValue.mail,
      password: formValue.password,
      username: formValue.username,
      role: formValue.role,
      terrains: []
    };

    const observer = {
      next: (utilisateur: UtilisateurDTO) => {
        this.utilisateurCreated.emit(utilisateur);
        this.resetForm();
      },
      error: (err: Error) => {
        console.error('Erreur', err);
        this.errorMessage = err.message || "Une erreur est survenue";
      }
    };

    if (formValue.id) {
      this.utilisateurService.updateUtilisateur(formValue.id, userData).subscribe(observer);
    } else {
      this.utilisateurService.createUtilisateur(userData).subscribe(observer);
    }
  }

  resetForm() {
    this.form.reset({
      role: 'USER'
    });
    this.isEditMode = false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

    if (fieldName === 'nom' || fieldName === 'username') {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    if (fieldName === 'mail') {
      if (field.errors['required']) return 'L\'email est requis';
      if (field.errors['email']) return 'Email invalide';
    }
    if (fieldName === 'password') {
      if (field.errors['required']) return 'Le mot de passe est requis';
      if (field.errors['minlength']) return 'Minimum 8 caractères';
      if (field.errors['passwordStrength']) {
        const errors = field.errors['passwordStrength'];
        const missing = [];
        if (errors.missingUpperCase) missing.push('une majuscule');
        if (errors.missingLowerCase) missing.push('une minuscule');
        if (errors.missingNumber) missing.push('un chiffre');
        return `Le mot de passe doit contenir: ${missing.join(', ')}`;
      }
    }
    return '';
  }
}
