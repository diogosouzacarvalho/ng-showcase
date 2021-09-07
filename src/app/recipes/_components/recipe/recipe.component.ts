import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  
  @Input() recipe!: Recipe;
  @Input() index!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
