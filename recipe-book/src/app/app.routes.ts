import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CreateRecipeComponent } from "./pages/recipe/create-recipe/create-recipe.component";
import { ReadRecipeComponent } from "./pages/recipe/read-recipe/read-recipe.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home Page",
  },
  {
    path: "create-recipe",
    component: CreateRecipeComponent,
    title: "Create recipe",
  },
  {
    path: "recipe/:id",
    component: ReadRecipeComponent,
    title: "Create recipe",
  },
];
