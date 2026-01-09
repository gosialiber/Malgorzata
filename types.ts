
export interface Ingredient {
  item: string;
  amount: string;
  unit: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutritionalInfo: NutritionInfo;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
