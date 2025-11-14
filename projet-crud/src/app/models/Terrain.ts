import { Coordonnee } from './Coordonnee';

export interface Terrain {
  id: number;
  nom: string;
  quantity: number;
  description: string;
  coordonnee: Coordonnee;
}
