import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../recipes.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  recipeIndex!: number;
  editMode = false;

  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = +params.id;
        this.editMode = !!params.id;
        this.initForm();
      }
    )
  }

  private initForm(): void {
    let name = '';
    let description = '';
    let duration = '';
    let difficulty = '';
    let imagePath = '';
    let ingredients = new FormArray([]);
    let steps = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeIndex);
      name = recipe.name;
      description = recipe.description;
      duration = recipe.duration;
      difficulty = recipe.difficulty;
      imagePath = recipe.imagePath;
      
      if (recipe.ingredients.length) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          )
        }
      }

      if (recipe.steps.length) {
        for (let step of recipe.steps) {
          steps.push(
            new FormGroup({
              'number': new FormControl(step.number, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              'text': new FormControl(step.text, Validators.required),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'duration': new FormControl(duration, Validators.required),
      'difficulty': new FormControl(difficulty, [
        Validators.required,
        Validators.pattern(/^(easy|medium|hard)$/),
      ]),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': ingredients,
      'steps': steps,
    });
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;

  }

  get stepsControls() {
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }

  onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        'number': new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        'text': new FormControl('', Validators.required),
      })
    )
  }

  onDeleteStep(index: number): void {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  onSubmit(): void {
    const recipe: Recipe = this.recipeForm.value;
    recipe.publicationDate = new Date();

    this.editMode
      ? this.recipeService.updateRecipe(this.recipeIndex, recipe)
      : this.recipeService.addRecipe(recipe);

    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
