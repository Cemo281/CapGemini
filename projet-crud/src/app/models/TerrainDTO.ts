import { CoordonneeDTO } from './CoordonneeDTO';

export interface TerrainDTO {
  id: number;
  nom: string;
  quantity: number;
  description: string;
  coordonnee: CoordonneeDTO;
}
