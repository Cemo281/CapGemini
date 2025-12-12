import { TerrainDTO } from './TerrainDTO';

export interface UtilisateurDTO {
  id?: number;
  nom: string;
  prenom?: string;
  mail: string;
  password: string;
  username: string;
  terrains?: TerrainDTO[];
  role?: string;
}
