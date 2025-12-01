import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TerrainDTO } from '../models/TerrainDTO';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  private apiUrl = 'http://localhost:8080/terrains';

  constructor(private http: HttpClient) {}

  createTerrain(terrain: TerrainDTO) {
    return this.http.post<TerrainDTO>(this.apiUrl, terrain);
  }
}
