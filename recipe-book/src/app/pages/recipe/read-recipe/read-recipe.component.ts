import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe-service.service';
import { Recipe } from '../../../interfaces/recipe-interface';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-read-recipe',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  templateUrl: './read-recipe.component.html',
  styleUrl: './read-recipe.component.scss',
})
export class ReadRecipeComponent implements OnInit {
  recipieID: number = -1;

  displayedColumns: string[] = ['item', 'quantity', 'unit', 'preparation', 'optional'];

  constructor(private readonly route: ActivatedRoute, private readonly recipiesService: RecipeService) {}

  recipe = computed(() => {
    if(this.recipieID !== -1 && this.recipiesService.recipeList() !== undefined) {
      return (this.recipiesService.recipeList() as Recipe[])[this.recipieID]
    }
    else {
      return undefined
    }
  });

  ngOnInit() {
    this.route.params.subscribe((event) => {
      this.recipieID = event['id'];
    });
  }
}
