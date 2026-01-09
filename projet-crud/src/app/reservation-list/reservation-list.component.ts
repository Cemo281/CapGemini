import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation-service.service';
import { ReservationDTO } from '../models/ReservationDTO';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservations: ReservationDTO[] = [];
  loading = false;
  error = '';
  isAdmin$: Observable<boolean>;

  @Output() reservationDeleted = new EventEmitter<number>();
  @Output() addRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<ReservationDTO>();

  constructor(private reservationService: ReservationService, private authService: AuthService) {
    this.isAdmin$ = this.authService.role$.pipe(
      map(role => role === 'ADMIN' || role === 'admin')
    );
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  onAddClick() {
    this.addRequest.emit();
  }

  onEditClick(item: ReservationDTO) {
    this.editRequest.emit(item);
  }

  loadReservations() {
    this.loading = true;
    this.error = '';
    this.reservationService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des réservations';
        this.loading = false;
      }
    });
  }

  refreshList(): void {
    this.loadReservations();
  }

  deleteReservation(id: number | undefined) {
    if (id === undefined) return;
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        this.reservationDeleted.emit(id);
        this.loadReservations();
      },
      error: () => {
        this.error = 'Erreur lors de la suppression';
      }
    });
  }
}
