import { Terrain } from './Terrain';

export interface UtilisateurDTO {
  id: number;
  nom: string;
  email: string;
  password: string;
  userName: string;
  terrains: Terrain[];
}
