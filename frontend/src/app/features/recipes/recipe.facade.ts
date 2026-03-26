import { Router } from '@angular/router';
import { Recipe } from './recipes.model';
import { RecipeStore } from './recipe.store';
import { RecipeService } from './recipes.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeFacade {
  service = inject(RecipeService);
  store = inject(RecipeStore);
  router = inject(Router);

  recipes = this.store.recipes;

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

  setPage(page: number) {
    this.store.filters.update((f) => ({ ...f, page }));
    this.loadRecipes();
  }

  setCategory(category: string) {
    this.store.filters.update((f) => ({
      ...f,
      category,
      page: 1,
    }));
    this.loadRecipes();
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

  toggleLike(recipe: Recipe) {
    const original = { ...recipe };

    const updated: Recipe = {
      ...recipe,
      isLiked: !recipe.isLiked,
      likesCount: recipe.likesCount + (recipe.isLiked ? -1 : 1),
    };

    this.store.updateRecipe(updated);

    const request = updated.isLiked
      ? this.service.likeRecipe(recipe._id)
      : this.service.unlikeRecipe(recipe._id);

    request.subscribe({
      error: (err) => {
        this.handleAuth(err);
        this.store.updateRecipe(original);
      },
    });
  }

  toggleFavorite(recipe: Recipe) {
    const original = { ...recipe };

    const updated: Recipe = {
      ...recipe,
      isFavorite: !recipe.isFavorite,
    };

    this.store.updateRecipe(updated);

    const request = updated.isFavorite
      ? this.service.favoriteRecipe(recipe._id)
      : this.service.unfavoriteRecipe(recipe._id);

    request.subscribe({
      error: (err) => {
        this.handleAuth(err);
        this.store.updateRecipe(original);
      },
    });
  }

  private handleAuth(err: any) {
    if (err.status === 401) {
      this.router.navigate(['/auth/login']);
    }
  }
}
