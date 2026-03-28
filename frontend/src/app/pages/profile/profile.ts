import { Component, inject } from '@angular/core';
import { RecipeFacade } from '../../features/recipes/recipe.facade';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
})
export class Profile {
  private facade = inject(RecipeFacade);

  myRecipes = this.facade.myRecipes;
  favorites = this.facade.favoriteRecipes;
  liked = this.facade.likedRecipes;

  logData() {
    console.log('MY ==> ', this.myRecipes());
    console.log('FAVORITES ==> ', this.favorites());
    console.log('LIKES ==> ', this.liked());
  }

  ngOnInit() {
    this.facade.loadMyRecipes();
    this.facade.loadFavorites();
    this.facade.loadLiked();
  }

  handleDelete(id: string) {
    this.facade.deleteRecipe(id);
  }
}
