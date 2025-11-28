// typescript
import { Component, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CoordonneeDTO } from "../models/CoordonneeDTO";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-coordonnee-creator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './coordonnee-creator.component.html',
  styleUrls: ['./coordonnee-creator.component.css']
})

export class CoordonneeCreatorComponent {
  coordonneeForm!: FormGroup;

  // L'Output pour renvoyer les données valides au parent
  // Note: En mode création, l'ID dans le DTO sera géré par le backend ou le service.
  @Output() submitted = new EventEmitter<Omit<CoordonneeDTO, 'id'>>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Définition du formulaire pour les champs de création (pas d'ID)
    this.coordonneeForm = this.fb.group({
      latitude: [
        null, // Initialisé à null
        [Validators.required, Validators.min(-90), Validators.max(90)]
      ],
      longitude: [
        null, // Initialisé à null
        [Validators.required, Validators.min(-180), Validators.max(180)]
      ]
    });
  }

  onSubmit(): void {
    if (this.coordonneeForm.valid) {
      // Émet les données (latitude et longitude)
      // L'ID n'est pas inclus car il n'est pas dans le formulaire
      this.submitted.emit(this.coordonneeForm.value);

      // Réinitialise le formulaire après une création réussie
      this.coordonneeForm.reset();
    } else {
      // Marque tous les champs comme 'touchés' pour afficher les erreurs
      this.coordonneeForm.markAllAsTouched();
    }
  }

  get f() { return this.coordonneeForm.controls; }
}
