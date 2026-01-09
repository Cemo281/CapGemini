import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDTO } from '../models/ReservationDTO';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservation: ReservationDTO) {
    console.log('Sending POST request to', this.apiUrl, 'with data:', reservation);
    return this.http.post<ReservationDTO>(this.apiUrl, reservation).pipe(
      tap(response => console.log('POST response:', response)),
      catchError(this.handleError)
    );
  }

  updateReservation(id: number, reservation: ReservationDTO) {
    console.log('Sending PUT request to', `${this.apiUrl}/${id}`, 'with data:', reservation);
    return this.http.put<ReservationDTO>(`${this.apiUrl}/${id}`, reservation).pipe(
      tap(response => console.log('PUT response:', response)),
      catchError(this.handleError)
    );
  }

  getReservations() {
    console.log('Sending GET request to', this.apiUrl);
    return this.http.get<ReservationDTO[]>(this.apiUrl).pipe(
      tap(response => console.log('GET response:', response)),
      catchError(this.handleError)
    );
  }

  deleteReservation(id: number) {
    console.log('Sending DELETE request to', `${this.apiUrl}/${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('DELETE response:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += `\nDetails: ${JSON.stringify(error.error)}`;
      }
    }
    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
