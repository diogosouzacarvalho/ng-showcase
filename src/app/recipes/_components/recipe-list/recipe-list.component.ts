import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipesService } from '../../recipes.service';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  subscription: Subscription | undefined;

  recipes: Recipe[] = [];

  isLoading = false;

  constructor(
    private recipesService: RecipesService,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  
  onSaveList(): void {
    this.isLoading = true;
    this.recipesService.storeRecipes().subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
