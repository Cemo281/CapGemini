import { CoordonneeDTO } from './CoordonneeDTO';

export interface TerrainDTO {
  id?: number;
  nom: string;
  quantite: number;
  description: string;
  coordonnees: CoordonneeDTO;
}
