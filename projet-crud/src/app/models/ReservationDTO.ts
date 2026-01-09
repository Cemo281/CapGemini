import { UtilisateurDTO } from './UtilisateurDTO';
import { TerrainDTO } from './TerrainDTO';

export interface ReservationDTO {
  id?: number;
  utilisateur: UtilisateurDTO;
  terrains: TerrainDTO[];
  commentaire?: string;
}
