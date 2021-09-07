export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public duration: string,
    public steps: RecipeStep[],
    public imagePath: string,
    public publicationDate: Date,
    public difficulty: RecipeDifficulty,
    public ingredients: Ingredient[],
  ) {}
}

export interface RecipeStep {
  number: number,
  text: string,
}

export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export class Ingredient {
  constructor(public name: string, public amount: number) {}
}
