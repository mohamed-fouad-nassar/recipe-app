import { Recipe } from './recipes.model';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeStore {
  recipes = signal<Recipe[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  setError(message: string | null) {
    this.error.set(message);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes.set(recipes);
  }

  updateRecipe(updated: Recipe) {
    this.recipes.update((list) => list.map((r) => (r._id === updated._id ? updated : r)));
  }
}
