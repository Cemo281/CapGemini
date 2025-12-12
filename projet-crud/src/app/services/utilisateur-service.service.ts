import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurDTO } from '../models/UtilisateurDTO';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080/utilisateurs';

  constructor(private http: HttpClient) {}

  createUtilisateur(utilisateur: UtilisateurDTO) {
    console.log('Sending POST request to', this.apiUrl, 'with data:', utilisateur);
    return this.http.post<UtilisateurDTO>(this.apiUrl, utilisateur).pipe(
      tap(response => console.log('POST response:', response)),
      catchError(this.handleError)
    );
  }

  getUtilisateurs() {
    console.log('Sending GET request to', this.apiUrl);
    return this.http.get<UtilisateurDTO[]>(this.apiUrl).pipe(
      tap(response => console.log('GET response:', response)),
      catchError(this.handleError)
    );
  }

  deleteUtilisateur(id: number) {
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
