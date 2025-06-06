import { Component, Inject, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ingredients } from '../../../interfaces/ingredients-interface';
import { Recipe } from '../../../interfaces/recipe-interface';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  readonly methods = signal<Array<string>>([]);

  readonly ingredients = signal<Array<ingredients>>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateRecipeComponent>
  ) {
    if (data && this.data.recipe()) {
      let recipe: Recipe = this.data.recipe();
      this.RecipeForm.controls['title'].setValue(recipe.title);
      this.RecipeForm.controls['image'].setValue(recipe.imagestr);
      this.methods.set(recipe.method);
      this.ingredients.set(recipe.ingredients);
      this.RecipeForm.controls['favorite'].setValue(recipe.favorite);
    }
  }

  //set form group for recipe
  RecipeForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    ingredients: new FormGroup({
      item: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      preparation: new FormControl(''),
      optional: new FormControl(true),
    }),
    method: new FormControl('', Validators.required),
    favorite: new FormControl(false, Validators.required),
  });

  //add ingredients
  addIngredients(): void {
    if (!this.RecipeForm.get('ingredients')?.invalid) {
      let ingredient = this.RecipeForm.get('ingredients')!.value as ingredients;
      this.ingredients.update((ingredients) => [...ingredients, ingredient]);
    }
  }

  //method add and remove
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.methods.update((methods) => [...methods, value]);
    }
    event.chipInput.inputElement.value = '';
  }

  remove(method: string): void {
    this.methods.update((methods) => {
      const index = methods.indexOf(method);
      if (index < 0) {
        return methods;
      }
      methods.splice(index, 1);
      return [...methods];
    });
  }

  removeIngredients(ingredient: ingredients): void {
    this.ingredients.update((ingredients) => {
      const index = ingredients.indexOf(ingredient);
      if (index < 0) {
        return ingredients;
      }
      ingredients.splice(index, 1);
      return [...ingredients];
    });
  }

  close(): Recipe {
    let recipe: Recipe = this.RecipeForm.value;
    recipe.ingredients = this.ingredients();
    recipe.method = this.methods();
    return recipe;
  }
}
