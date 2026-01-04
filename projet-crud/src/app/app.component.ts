import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CoordonneeCreatorComponent} from "./coordonnee-creator/coordonnee-creator.component";
import {UtilisateurListComponent} from "./utilisateur-list/utilisateur-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoordonneeCreatorComponent, UtilisateurListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion'; // Ajouté pour l'exemple

  utilisateurs : any[] = [];

  // Fonction pour gérer les données de la nouvelle coordonnée
  handleNewCoordData(newCoord: { latitude: number; longitude: number }) {
    console.log("Nouvelle coordonnée à créer:", newCoord);
    // Ajoutez la logique pour appeler le service d'API.
    alert(`Nouvelle coordonnée enregistrée : Lat=${newCoord.latitude}, Long=${newCoord.longitude}`);
  }
}
