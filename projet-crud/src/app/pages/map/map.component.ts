import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { TerrainService } from '../../services/terrain-service.service';
import { CoordonneeDTO } from '../../models/CoordonneeDTO';
import { TerrainDTO } from '../../models/TerrainDTO';
import { RouterModule } from '@angular/router';

import 'leaflet/dist/leaflet.css' ; //VS Code shows an error but if removed it bugs and forms a strange grid that is unusabel

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapElement!: ElementRef;
  
  private map!: L.Map;
  private coordMarkers: L.Marker[] = [];
  coordinates: CoordonneeDTO[] = [];
  loading = true;
  error: string | null = null;

  constructor(private terrainService: TerrainService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    // Default center (Paris)
    const defaultCenter: [number, number] = [48.8566, 2.3522];
    
    setTimeout(() => {
      this.map = L.map('map').setView(defaultCenter, 13);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);

      // Trigger loading coordinates after map is ready
      this.loadCoordinates();
    }, 100);
  }

  private loadCoordinates(): void {
    // Get all terrains and their coordinates
    this.terrainService.getTerrains().subscribe({
      next: (terrains: TerrainDTO[]) => {
        console.log('Terrains loaded:', terrains);
        terrains.forEach((terrain: TerrainDTO) => {
          if (terrain.coordonnees) {
            console.log('Adding marker for:', terrain.nom, terrain.coordonnees);
            this.coordinates.push(terrain.coordonnees);
            this.addMarkerToMap(terrain.coordonnees, terrain.nom);
          }
        });
        this.loading = false;
        console.log('Total markers added:', this.coordMarkers.length);
      },
      error: (err: any) => {
        this.error = 'Failed to load coordinates';
        this.loading = false;
        console.error('Error loading terrains:', err);
      }
    });
  }

  private addMarkerToMap(coord: CoordonneeDTO, terrainName: string): void {
    console.log('addMarkerToMap called with:', coord, terrainName);
    if (this.map && coord.latitude && coord.longitude) {
      const lat = parseFloat(coord.latitude);
      const lng = parseFloat(coord.longitude);
      
      console.log('Parsed coordinates:', lat, lng, 'isNaN:', isNaN(lat), isNaN(lng));
      
      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng])
          .bindPopup(`<b>${terrainName}</b><br>Lat: ${lat}<br>Lng: ${lng}`)
          .addTo(this.map);
        
        this.coordMarkers.push(marker);
        console.log('Marker added successfully');
      } else {
        console.warn('Invalid coordinates for', terrainName, ':', lat, lng);
      }
    } else {
      console.warn('Map not ready or missing coordinates for', terrainName);
    }
  }

  // Fit all markers in view
  fitBounds(): void {
    if (this.coordMarkers.length > 0) {
      const group = new L.FeatureGroup(this.coordMarkers);
      this.map.fitBounds(group.getBounds());
    }
  }
}