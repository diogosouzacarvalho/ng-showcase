import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ingredient, Recipe, RecipeDifficulty } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiPath = 'https://ng-showcase-a30bf-default-rtdb.europe-west1.firebasedatabase.app';

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'First Mock Recipe',
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis urna a risus elementum, vitae aliquam nunc tincidunt. Donec at faucibus odio, id molestie diam. Sed eget metus a nunc finibus convallis. Aliquam erat volutpat. Nulla volutpat dui sapien, sit amet vehicula lorem gravida eu. Nulla nec magna at nisl pulvinar auctor. Cras gravida, ligula a condimentum laoreet, risus justo tincidunt nunc, vel varius odio tellus quis nunc.',
  //     '00:30',
  //     [
  //       { number: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis urna a risus elementum.' },
  //       { number: 2, text: 'Donec at faucibus odio, id molestie diam.' },
  //       { number: 3, text: 'Nulla volutpat dui sapien, sit amet vehicula lorem gravida eu. Nulla nec magna at nisl pulvinar auctor.' },
  //     ],
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
  //     new Date(),
  //     RecipeDifficulty.EASY,
  //     [
  //       new Ingredient('Meat', 2),
  //       new Ingredient('Flour', 5),
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Mock Recipe',
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis urna a risus elementum, vitae aliquam nunc tincidunt. Donec at faucibus odio, id molestie diam. Sed eget metus a nunc finibus convallis. Aliquam erat volutpat. Nulla volutpat dui sapien, sit amet vehicula lorem gravida eu. Nulla nec magna at nisl pulvinar auctor. Cras gravida, ligula a condimentum laoreet, risus justo tincidunt nunc, vel varius odio tellus quis nunc.',
  //     '01:45',
  //     [
  //       { number: 1, text: 'Nulla volutpat dui sapien, sit amet vehicula lorem gravida eu. Nulla nec magna at nisl pulvinar auctor.' },
  //       { number: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis urna a risus elementum.' },
  //       { number: 3, text: 'Donec at faucibus odio, id molestie diam.' },
  //     ],
  //     'https://www.simplyrecipes.com/thmb/SDsQm323X7tk4wRZ0sXtkL-jvuM=/1600x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
  //     new Date(),
  //     RecipeDifficulty.MEDIUM,
  //     [
  //       new Ingredient('Tomatos', 5),
  //       new Ingredient('Bread', 2),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Lettuce', 3),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    // private shoppingListService: ShoppingListService
  ) {}

  private refreshRecipes(): void {
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.refreshRecipes();
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]): void {
  //   this.shoppingListService.addIngredients(ingredients);
  // }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.refreshRecipes();
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.refreshRecipes();
  }

  deleteRecipe(index: number): void {
    this.recipes = this.recipes.filter((_rec, i) => i !== index);
    this.refreshRecipes();
  }

  storeRecipes(): Observable<Recipe[]> {
    const recipes = this.getRecipes();

    return this.http.put<Recipe[]>(`${this.apiPath}/recipes.json`, recipes);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiPath}/recipes.json`).pipe(
      map(recipes => recipes.map(recipe => ({
        ...recipe,
        ingredients: recipe.ingredients || [],
      }))),
      tap(recipes => {
        this.setRecipes(recipes);
      })
    );
  }
}
