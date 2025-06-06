import { ingredients } from './ingredients-interface';

export interface Recipe {
  id: number;
  title: string;
  ingredients: Array<ingredients>;
  method: string[];
  favorite?: boolean;
  imagestr?: string;
}
