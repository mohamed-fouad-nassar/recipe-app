import { Recipe } from './recipes.model';
import { RecipeService } from './recipes.service';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeStore {
  service = inject(RecipeService);

  recipes = signal<Recipe[]>([]);
  myRecipes = signal<Recipe[]>([]);
  favoriteRecipes = signal<Recipe[]>([]);
  likedRecipes = signal<Recipe[]>([]);

  loading = signal(false);
  error = signal<string | null>(null);

  filters = signal({ page: 1, limit: 12, category: '' });
  total = signal(0);

  private updateLists(updated: Recipe) {
    [this.recipes, this.myRecipes, this.favoriteRecipes, this.likedRecipes].forEach((list) => {
      list.update((arr) => arr.map((r) => (r._id === updated._id ? updated : r)));
    });
  }

  private removeFromLists(id: string) {
    [this.recipes, this.myRecipes, this.favoriteRecipes, this.likedRecipes].forEach((list) => {
      list.update((arr) => arr.filter((r) => r._id !== id));
    });
  }

  setLoading(value: boolean) {
    this.loading.set(value);
  }
  setError(message: string | null) {
    this.error.set(message);
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes.set(recipes);
  }

  loadMyRecipes() {
    this.setLoading(true);
    this.service.getMyRecipes().subscribe({
      next: (res) => this.myRecipes.set(res.data.recipes),
      error: (err) => this.setError(err.message),
      complete: () => this.setLoading(false),
    });
  }

  loadFavorites() {
    this.setLoading(true);
    this.service.getFavorites().subscribe({
      next: (res) => {
        this.favoriteRecipes.set(
          res.data.favorites.map((i: any) => ({ ...i.recipeId, isFavorite: true })),
        );
      },
      error: (err) => this.setError(err.message),
      complete: () => this.setLoading(false),
    });
  }

  loadLiked() {
    this.setLoading(true);
    this.service.getLiked().subscribe({
      next: (res) =>
        this.likedRecipes.set(res.data.likes.map((i: any) => ({ ...i.recipeId, isLiked: true }))),
      error: (err) => this.setError(err.message),
      complete: () => this.setLoading(false),
    });
  }

  toggleLike(recipe: Recipe) {
    const original = { ...recipe };
    const updated: Recipe = {
      ...recipe,
      isLiked: !recipe.isLiked,
      likesCount: recipe.likesCount + (recipe.isLiked ? -1 : 1),
    };
    this.updateLists(updated);

    const request = updated.isLiked
      ? this.service.likeRecipe(recipe._id)
      : this.service.unlikeRecipe(recipe._id);
    request.subscribe({ error: () => this.updateLists(original) });
  }

  toggleFavorite(recipe: Recipe) {
    const original = { ...recipe };
    const updated: Recipe = { ...recipe, isFavorite: !recipe.isFavorite };
    this.updateLists(updated);

    const request = updated.isFavorite
      ? this.service.favoriteRecipe(recipe._id)
      : this.service.unfavoriteRecipe(recipe._id);
    request.subscribe({ error: () => this.updateLists(original) });
  }

  deleteRecipe(id: string) {
    this.service.deleteRecipe(id).subscribe({ next: () => this.removeFromLists(id) });
  }
}
