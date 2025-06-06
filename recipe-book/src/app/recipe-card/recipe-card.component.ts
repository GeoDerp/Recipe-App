import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from "@angular/core";
import { Recipe } from "../interfaces/recipe-interface";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-card",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: "./recipe-card.component.html",
  styleUrl: "./recipe-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Output()
  favorite = new EventEmitter();
  recipe = input.required<Recipe>();
  displayedColumns: string[] = [
    "item",
    "quantity",
    "unit",
    "preparation",
    "optional",
  ];

  constructor(private readonly router: Router) {}

  favoriteButton() {
    this.favorite.emit();
  }

  recipePage() {
    this.router.navigate([`/recipe/${this.recipe().id}`]);
  }
}
