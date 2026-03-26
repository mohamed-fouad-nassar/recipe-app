import { RecipeDetails } from './recipes.model';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeStore {
  selectedRecipe = signal<RecipeDetails | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  setError(message: string | null) {
    this.error.set(message);
  }

  setSelectedRecipe(recipe: RecipeDetails | null) {
    this.selectedRecipe.set(recipe);
  }

  updateSelectedRecipe(recipe: RecipeDetails) {
    this.selectedRecipe.set(recipe);
  }
}
