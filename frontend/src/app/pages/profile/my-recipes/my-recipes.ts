import { initFlowbite } from 'flowbite';
import { AfterViewInit, Component, inject } from '@angular/core';
import { RecipeStore } from '../../../features/recipes/recipe.store';
import { ProfileRecipeCard } from '../../../features/recipes/profile-recipe-card/profile-recipe-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-my-recipes',
  templateUrl: './my-recipes.html',
  imports: [ProfileRecipeCard, RouterLink],
})
export class ProfileMyRecipes implements AfterViewInit {
  store = inject(RecipeStore);

  handleDelete(id: string) {
    this.store.deleteRecipe(id);
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  constructor() {
    this.store.loadMyRecipes();
  }
}
