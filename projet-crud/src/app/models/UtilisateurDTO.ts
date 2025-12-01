import { TerrainDTO } from './TerrainDTO';

export interface UtilisateurDTO {
  id?: number;
  nom: string;
  email: string;
  password: string;
  userName: string;
  terrains: TerrainDTO[];
}
