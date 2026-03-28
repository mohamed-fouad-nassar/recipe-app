import { Recipe } from './recipes.model';
import { RecipeStore } from './recipe.store';
import { RecipeService } from './recipes.service';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeFacade {
  store = inject(RecipeStore);
  service = inject(RecipeService);

  recipes = this.store.recipes;
  myRecipes = this.store.myRecipes;
  favoriteRecipes = this.store.favoriteRecipes;
  likedRecipes = this.store.likedRecipes;
  loading = this.store.loading;
  error = this.store.error;

  loadHomeRecipes() {
    this.store.setLoading(true);
    this.store.setError(null);

    this.service.fetchHomeRecipes().subscribe({
      next: (res) => {
        this.store.setRecipes(res.data.recipes);
        this.store.setLoading(false);
      },
      error: () => {
        this.store.setError('Failed to load recipes');
        this.store.setLoading(false);
      },
    });
  }

  loadRecipes() {
    const { page, limit, category } = this.store.filters();
    this.store.setLoading(true);
    this.store.setError(null);

    this.service.fetchAllRecipes({ page, limit, category }).subscribe({
      next: (res) => {
        this.store.setRecipes(res.data.recipes);
        this.store.total.set(res.total);
        this.store.setLoading(false);
      },
      error: () => {
        this.store.setError('Failed to load recipes');
        this.store.setLoading(false);
      },
    });
  }

  setPage(page: number) {
    this.store.filters.update((f) => ({ ...f, page }));
    this.loadRecipes();
  }
  setCategory(category: string) {
    this.store.filters.update((f) => ({ ...f, category, page: 1 }));
    this.loadRecipes();
  }

  toggleLike(recipe: Recipe) {
    this.store.toggleLike(recipe);
  }
  toggleFavorite(recipe: Recipe) {
    this.store.toggleFavorite(recipe);
  }

  loadMyRecipes() {
    this.store.loadMyRecipes();
  }
  loadFavorites() {
    this.store.loadFavorites();
  }
  loadLiked() {
    this.store.loadLiked();
  }
  deleteRecipe(id: string) {
    this.store.deleteRecipe(id);
  }
}
