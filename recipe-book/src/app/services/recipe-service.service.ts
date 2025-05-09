import { inject, Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe-interface';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  url = 'assets/recipes.json';
  http = inject(HttpClient);

  recipeList$ = this.http.get<Recipe[]>(this.url);
  recipeList = toSignal(this.recipeList$);

  // getAllRecipes(): Recipe[] {
  //   return this.recipeList() as Recipe[];
  // }

  getRecipeById(id: number): Recipe | undefined {
    if (this.recipeList !== undefined) {
      return this.recipeList()!.find((recipe) => recipe.id === id);
    }
    return undefined
  }
}
