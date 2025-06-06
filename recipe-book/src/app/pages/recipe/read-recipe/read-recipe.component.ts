import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { RecipeImagesService } from '../../../services/recipe-images-service.service';

@Component({
  selector: 'app-read-recipe',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './read-recipe.component.html',
  styleUrl: './read-recipe.component.scss',
})
export class ReadRecipeComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  recipeID: number = -1;

  displayedColumns: string[] = [
    'item',
    'quantity',
    'unit',
    'preparation',
    'optional',
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipesService: RecipeService,
    private readonly recipeImages: RecipeImagesService

  ) {}

  recipe = computed(() => {
    if (this.recipeID !== -1) {
      let rIndex = this.recipesService
        .recipeList()
        .findIndex((v) => Number(v.id) === Number(this.recipeID));
      let recipe = this.recipesService.recipeList().at(rIndex);
      recipe!.imagestr = this.recipeImages.getImg(String(this.recipeID));
      return recipe;
    } else {
      return undefined;
    }
  });

  ngOnInit() {
    this.route.params.subscribe((event) => {
      this.recipeID = event['id'];
    });
  }

  editDialog() {
    const dialogRef = this.dialog.open(CreateRecipeComponent, {
      data: { recipe: this.recipe },
      height: '700px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        result.id = this.recipeID;
        // add index
        // this.uploadFile(result.image);
        this.recipesService.updateRecipe(result);
      }
    });
  }

  //will fix on backend
  uploadFile(file: string) {
    // const fileBlob = new Blob([file], { type: 'image/jpeg' });
    // saveAs(response);
  }
}
