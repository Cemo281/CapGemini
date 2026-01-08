import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private apiUrl = 'http://localhost:8080/terrains';

  constructor(private http: HttpClient) {}

  createTerrain(terrain: TerrainDTO) {
    console.log('Sending POST request to', this.apiUrl, 'with data:', terrain);
    return this.http.post<TerrainDTO>(this.apiUrl, terrain).pipe(
      tap(response => console.log('POST response:', response)),
      catchError(this.handleError)
    );
  }

  getTerrains() {
    console.log('Sending GET request to', this.apiUrl);
    return this.http.get<TerrainDTO[]>(this.apiUrl).pipe(
      tap(response => console.log('GET response:', response)),
      catchError(this.handleError)
    );
  }

  deleteTerrain(id: number) {
    console.log('Sending DELETE request to', `${this.apiUrl}/${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('DELETE response:', response)),
      catchError(this.handleError)
    );
  }

  updateTerrain(id: number, terrain: TerrainDTO) {
    console.log('Sending PUT request to', `${this.apiUrl}/${id}`, 'with data:', terrain);
    return this.http.put<TerrainDTO>(`${this.apiUrl}/${id}`, terrain).pipe(
      tap(response => console.log('PUT response:', response)),
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
