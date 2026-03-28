import { Component, inject } from '@angular/core';
import { RecipeStore } from '../../../features/recipes/recipe.store';
import { RecipeFacade } from '../../../features/recipes/recipe.facade';
import { RecipeCard } from '../../../features/recipes/recipe-card/recipe-card';

@Component({
  selector: 'app-profile-liked',
  templateUrl: './liked.html',
  imports: [RecipeCard],
})
export class ProfileLiked {
  store = inject(RecipeStore);
  facade = inject(RecipeFacade);

  constructor() {
    this.store.loadLiked();
  }
}
