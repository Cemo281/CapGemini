import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilisateurDTO } from "./models/UtilisateurDTO";
import { UtilisateurListComponent } from "./utilisateur-list/utilisateur-list.component";
import { CoordonneeCreatorComponent } from "./coordonnee-creator/coordonnee-creator.component"; // ⬅️ NOUVEL IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UtilisateurListComponent, CoordonneeCreatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion'; // Ajouté pour l'exemple

  utilisateurs : UtilisateurDTO[] = [
    { id: 1, nom: 'Dupont', email: 'enfnje', password: 'pass123', userName: 'jdupont', terrains : [] },
    { id: 2, nom: 'Martin', email: 'sophmart', password: 'pass456', userName: 'smartin', terrains : [] },
    { id: 3, nom: 'Durand', email: 'pierduran', password: 'pass789', userName: 'pdurand', terrains : []}
  ];

  // Fonction pour gérer les données de la nouvelle coordonnée
  handleNewCoordData(newCoord: { latitude: number; longitude: number }) {
    console.log("Nouvelle coordonnée à créer:", newCoord);
    // Ajoutez la logique pour appeler le service d'API.
    alert(`Nouvelle coordonnée enregistrée : Lat=${newCoord.latitude}, Long=${newCoord.longitude}`);
  }
}
