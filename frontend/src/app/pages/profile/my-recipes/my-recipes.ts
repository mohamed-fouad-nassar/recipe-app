import { Component, inject } from '@angular/core';
import { RecipeStore } from '../../../features/recipes/recipe.store';
import { ProfileRecipeCard } from '../../../features/recipes/profile-recipe-card/profile-recipe-card';

@Component({
  selector: 'app-profile-my-recipes',
  templateUrl: './my-recipes.html',
  imports: [ProfileRecipeCard],
})
export class ProfileMyRecipes {
  store = inject(RecipeStore);

  constructor() {
    this.store.loadMyRecipes();
  }
}
