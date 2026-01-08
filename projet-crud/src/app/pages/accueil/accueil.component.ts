import { Component } from '@angular/core';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from '../../app/map/map.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [UtilisateurListComponent, RouterModule, MapComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
}
