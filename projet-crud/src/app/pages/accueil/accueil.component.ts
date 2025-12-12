import { Component } from '@angular/core';
import { UtilisateurListComponent } from '../../utilisateur-list/utilisateur-list.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [UtilisateurListComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
}
