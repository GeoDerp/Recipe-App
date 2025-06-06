import { Component, computed, inject } from "@angular/core";
import { RecipeService } from "../../services/recipe-service.service";
import { RecipeCardComponent } from "../../recipe-card/recipe-card.component";
import { MatCardModule } from "@angular/material/card";
import { RecipeImagesService } from "../../services/recipe-images-service.service";
import { Recipe } from "../../interfaces/recipe-interface";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { CreateRecipeComponent } from "../recipe/create-recipe/create-recipe.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RecipeCardComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  // services
  readonly recipesService: RecipeService = inject(RecipeService);
  readonly recipeImages: RecipeImagesService = inject(RecipeImagesService);
  readonly dialog = inject(MatDialog);

  // grab recipes
  recipes = computed<Recipe[]>(() => {
    for (let recipe in this.recipesService.recipeList()) {
      this.recipesService.recipeList()[recipe].imagestr = this.recipeImages
        .getImg(String(Number(recipe) + 1));
    }
    let sorted = this.recipesService.recipeList().sort((a, b) => {
      if (a.favorite) {
        return Number(b.favorite) - Number(a.favorite);
      } else {
        return 1;
      }
    });
    return sorted;
  });

  editDialog() {
    const dialogRef = this.dialog.open(CreateRecipeComponent, {
      height: "700px",
      width: "700px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        result.index = this.recipesService.recipeList().length + 1;
        // add index
        this.uploadFile(result.image);
        this.recipesService.recipeList()?.push(result);
      }
    });
  }

  //will fix on backend
  uploadFile(file: string) {
    // const fileBlob = new Blob([file], { type: 'image/jpeg' });
    // saveAs(response);
  }

  generaterecipes() {
    //todos: add ai auto generate
  }

  favorite(id: number) {
    //find recipe index
    this.recipesService.favoriteRecipe(id);
  }
}
