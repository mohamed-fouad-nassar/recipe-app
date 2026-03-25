import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Component, computed, inject } from '@angular/core';

@Component({
  selector: 'app-recipes-section',
  templateUrl: './recipes-section.html',
  host: { class: 'block' },
  imports: [RecipeCard, RouterLink],
})
export class RecipesSection {
  handleLike(recipeId: string) {
    console.log(recipeId, 'in like');

    return '';
  }

  handleFavorite(recipeId: string) {
    console.log(recipeId, 'in favorite');

    return '';
  }

  private recipeService = inject(RecipeService);

  response = toSignal(
    this.recipeService.fetchHomeRecipes().pipe(
      catchError((err) => {
        console.error(err);
        return of({ error: true });
      }),
    ),
    { initialValue: null },
  );

  recipes = computed(() => {
    const res: any = this.response();
    return res?.data?.recipes ?? [];
  });

  loading = computed(() => this.response() === null);

  error = computed(() => {
    const res: any = this.response();
    return res?.error ? 'Failed to load recipes' : '';
  });
}
