import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ReservationDTO } from '../models/ReservationDTO';
import { ReservationService } from '../services/reservation-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../services/utilisateur-service.service';
import { TerrainService } from '../services/terrain-service.service';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { TerrainDTO } from '../models/TerrainDTO';

@Component({
  selector: 'app-reservation-creator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reservation-creator.component.html',
  styleUrls: ['./reservation-creator.component.css']
})
export class ReservationCreatorComponent implements OnChanges, OnInit {
  @Input() reservationToEdit: ReservationDTO | null = null;
  @Output() reservationCreated = new EventEmitter<ReservationDTO>();

  form: FormGroup;
  errorMessage: string | null = null;
  isEditMode = false;

  utilisateurs: UtilisateurDTO[] = [];
  terrains: TerrainDTO[] = [];

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private terrainService: TerrainService
  ) {
    this.form = this.fb.group({
      id: [undefined],
      utilisateurId: [undefined, Validators.required],
      terrainsIds: [[], Validators.required],
      commentaire: ['']
    });
  }

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe({ next: data => this.utilisateurs = data });
    this.terrainService.getTerrains().subscribe({ next: data => this.terrains = data });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = null;
    if (changes['reservationToEdit']) {
      if (this.reservationToEdit) {
        this.isEditMode = true;
        this.form.patchValue({
          id: this.reservationToEdit.id,
          utilisateurId: this.reservationToEdit.utilisateur?.id,
          terrainsIds: this.reservationToEdit.terrains?.map(t => t.id) || [],
          commentaire: this.reservationToEdit.commentaire || ''
        });
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    }
  }

  submitForm() {
    this.errorMessage = null;
    if (!this.form.valid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire';
      return;
    }

    const fv = this.form.value;
    const utilisateur = this.utilisateurs.find(u => u.id === fv.utilisateurId)!;
    const selectedTerrains = this.terrains.filter(t => (fv.terrainsIds || []).includes(t.id));

    const reservation: ReservationDTO = {
      utilisateur: utilisateur,
      terrains: selectedTerrains,
      commentaire: fv.commentaire
    };

    const observer = {
      next: (res: ReservationDTO) => {
        this.reservationCreated.emit(res);
        this.resetForm();
      },
      error: (err: Error) => {
        console.error('Erreur', err);
        this.errorMessage = err.message || "Une erreur est survenue";
      }
    };

    if (fv.id) {
      this.reservationService.updateReservation(fv.id, reservation).subscribe(observer);
    } else {
      this.reservationService.createReservation(reservation).subscribe(observer);
    }
  }

  resetForm() {
    this.form.reset({ terrainsIds: [] });
    this.isEditMode = false;
  }
}
