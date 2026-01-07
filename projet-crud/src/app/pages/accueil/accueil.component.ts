import { Component } from '@angular/core';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [UtilisateurListComponent, RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
}
