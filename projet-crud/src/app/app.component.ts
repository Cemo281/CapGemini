import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilisateurDTO } from "./models/UtilisateurDTO";
import {
  UtilisateurListComponent,
  UtilisateurListComponent as utilisate
} from "./utilisateur-list/utilisateur-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UtilisateurListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  utilisateurs : UtilisateurDTO[] = [
    { id: 1, nom: 'Dupont', email: 'enfnje', password: 'pass123', userName: 'jdupont', terrains : [] },
    { id: 2, nom: 'Martin', email: 'sophmart', password: 'pass456', userName: 'smartin', terrains : [] },
    { id: 3, nom: 'Durand', email: 'pierduran', password: 'pass789', userName: 'pdurand', terrains : []}
  ];
}
