import { Component, Input } from '@angular/core';
import { UtilisateurDTO} from "../models/UtilisateurDTO";

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [],
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent {
  @Input() utilisateurs: UtilisateurDTO[] = [];
}
