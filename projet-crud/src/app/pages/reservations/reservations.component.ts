import { Component, ViewChild } from '@angular/core';
import { ReservationDTO } from '../../models/ReservationDTO';
import { ReservationCreatorComponent } from '../../reservation-creator/reservation-creator.component';
import { ReservationListComponent } from '../../reservation-list/reservation-list.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [ReservationCreatorComponent, ReservationListComponent, CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  @ViewChild(ReservationListComponent) listComponent!: ReservationListComponent;
  showModal = false;
  selectedReservation: ReservationDTO | null = null;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.role$.pipe(
      map(role => role === 'ADMIN' || role === 'admin')
    );
  }

  openModal(reservationToEdit?: ReservationDTO) {
    this.selectedReservation = reservationToEdit || null;
    this.showModal = true;
  }

  closeModal(event?: Event) {
    this.showModal = false;
    this.selectedReservation = null;
  }

  onReservationCreated(newReservation: ReservationDTO) {
    this.showModal = false;
    this.selectedReservation = null;
    if (this.listComponent) {
      this.listComponent.refreshList();
    }
  }

  addReservation(newReservation: ReservationDTO) {
    this.onReservationCreated(newReservation);
  }
}
