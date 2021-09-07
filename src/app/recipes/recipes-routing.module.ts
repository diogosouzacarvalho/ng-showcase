import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesResolverService } from "./recipes-resolver.service";

import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeComponent } from "./_components/select-recipe/select-recipe.component";
import { RecipeDetailComponent } from "./_components/recipe-detail/recipe-detail.component";
import { RecipeFormComponent } from "./_components/recipe-form/recipe-form.component";

const routes: Routes = [
  { path: '', component: RecipesComponent, children: [
    { path: '', component: SelectRecipeComponent },
    { path: 'new', component: RecipeFormComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [ RecipesResolverService ] },
    { path: ':id/edit', component: RecipeFormComponent, resolve: [ RecipesResolverService ] },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
