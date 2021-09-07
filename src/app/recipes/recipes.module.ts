import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './_components/recipe-list/recipe-list.component';
import { SelectRecipeComponent } from './_components/select-recipe/select-recipe.component';
import { RecipeComponent } from './_components/recipe/recipe.component';
import { RecipeDetailComponent } from './_components/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './_components/recipe-form/recipe-form.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    SelectRecipeComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule,
  ]
})
export class RecipesModule { }
