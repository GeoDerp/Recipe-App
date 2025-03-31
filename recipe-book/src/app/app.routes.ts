import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateRecipeComponent } from './pages/recipe/create-recipe/create-recipe.component';
import { ReadRecipeComponent } from './pages/recipe/read-recipe/read-recipe.component';
import { UpdateRecipeComponent } from './pages/recipe/update-recipe/update-recipe.component';
import { FavouriteRecipeComponent } from './pages/recipe/favourite-recipe/favourite-recipe.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'create-recipe',
        component: CreateRecipeComponent,
        title: 'Create Recipie'
    },
    {
        path: 'favourite-recipe',
        component: FavouriteRecipeComponent,
        title: 'Create Recipie'
    },
    {
        path: 'read-recipe',
        component: ReadRecipeComponent,
        title: 'Create Recipie'
    },
    {
        path: 'update-recipe',
        component: UpdateRecipeComponent,
        title: 'Create Recipie'
    },


];
