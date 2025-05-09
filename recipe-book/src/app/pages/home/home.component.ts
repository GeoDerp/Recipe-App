import { Component, computed, inject, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe-service.service';
import { RecipeCardComponent } from '../../recipe-card/recipe-card.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeImagesService } from '../../services/recipe-images-service.service';
import { Recipe } from '../../interfaces/recipe-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // services
  recipiesService: RecipeService = inject(RecipeService);
  recipieImages: RecipeImagesService = inject(RecipeImagesService);


  // grab recipies
  recipies = computed(() => {
    if (this.recipiesService.recipeList() !== undefined) {
      let recipies = this.recipiesService.recipeList();
      for (let recipie in recipies as Recipe[]) {
        (recipies as Recipe[])[recipie].imagestr = this.recipieImages.getImg(String(Number(recipie) + 1))
      }
      return recipies
    } else {
      return [];
    }
  });

}
