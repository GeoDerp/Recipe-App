import { inject, Injectable, signal } from "@angular/core";
import { Recipe } from "../interfaces/recipe-interface";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  url = "assets/recipes.json";
  http = inject(HttpClient);

  recipeList = signal<Recipe[]>([]);

  //will change on backend
  constructor() {
    this.http.get<Recipe[]>(this.url).subscribe((v) => this.recipeList.set(v));
  }
  //will change on backend
  getRecipeById(id: number): Recipe | undefined {
    if (this.recipeList !== undefined) {
      return this.recipeList().find((recipe) => recipe.id === id);
    }
    return undefined;
  }
  //will change on backend
  favoriteRecipe(id: number): void {
    //find current value
    let rIndex = this.recipeList().findIndex((v) => v.id === id);
    let bool: boolean = true;
    if (this.recipeList().at(rIndex)!.favorite !== undefined) {
      //flip flop
      bool = !this.recipeList().at(rIndex)!.favorite;
    }

    //set signal with new fav falue
    this.recipeList.update((recipeList) =>
      recipeList.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: bool } : recipe
      )
    );
  }

  //update recipe info
  updateRecipe(uRecipe: Recipe) {
    //set signal with new fav falue
    this.recipeList.update((recipeList) =>
      recipeList.map((recipe) =>
        Number(recipe.id) === Number(uRecipe.id) ? uRecipe : recipe
      )
    );
    console.log(this.recipeList());
  }
}
