import { Router } from '@angular/router';
import { RecipeDetails } from './recipes.model';
import { RecipeService } from './recipes.service';
import { Injectable, inject } from '@angular/core';
import { RecipeStore } from './recipe-details.store';

@Injectable({
  providedIn: 'root',
})
export class RecipeFacade {
  service = inject(RecipeService);
  store = inject(RecipeStore);
  router = inject(Router);

  loadRecipe(id: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.service.fetchRecipeById(id).subscribe({
      next: (res) => {
        this.store.setSelectedRecipe(res.data.recipe);
        this.store.setLoading(false);
      },
      error: () => {
        this.store.setError('Failed to load recipe details');
        this.store.setLoading(false);
      },
    });
  }

  toggleLike(recipe: RecipeDetails) {
    const original = { ...recipe };
    const updated: RecipeDetails = {
      ...recipe,
      isLiked: !recipe.isLiked,
      likesCount: recipe.likesCount + (recipe.isLiked ? -1 : 1),
    };

    this.store.updateSelectedRecipe(updated);

    const request = updated.isLiked
      ? this.service.likeRecipe(recipe._id)
      : this.service.unlikeRecipe(recipe._id);

    request.subscribe({
      error: () => {
        this.store.updateSelectedRecipe(original);
      },
    });
  }

  toggleFavorite(recipe: RecipeDetails) {
    const original = { ...recipe };
    const updated: RecipeDetails = {
      ...recipe,
      isFavorite: !recipe.isFavorite,
    };

    this.store.updateSelectedRecipe(updated);

    const request = updated.isFavorite
      ? this.service.favoriteRecipe(recipe._id)
      : this.service.unfavoriteRecipe(recipe._id);

    request.subscribe({
      error: () => {
        this.store.updateSelectedRecipe(original);
      },
    });
  }
}
