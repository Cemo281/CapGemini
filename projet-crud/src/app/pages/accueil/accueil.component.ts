import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from '../../app/map/map.component';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [UtilisateurListComponent, RouterModule, MapComponent, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  
  username$: Observable<string | null>;
  role$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.username$ = this.authService.username$;
    this.role$ = this.authService.role$;
  }

  ngOnInit() {
    console.log('AccueilComponent initialized, username$:', this.username$);
    console.log('AccueilComponent initialized, role$:', this.role$);
  }

  fitBounds(): void {
    if (this.mapComponent) {
      this.mapComponent.fitBounds();
    }
  }
}
