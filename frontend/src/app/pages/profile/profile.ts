import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';
import { RecipeFacade } from '../../features/recipes/recipe.facade';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, DatePipe],
})
export class Profile {
  private facade = inject(RecipeFacade);
  auth = inject(AuthService);

  myRecipes = this.facade.myRecipes;
  favorites = this.facade.favoriteRecipes;
  liked = this.facade.likedRecipes;

  ngOnInit() {
    this.facade.loadMyRecipes();
    this.facade.loadFavorites();
    this.facade.loadLiked();
    this.auth.getProfile().subscribe();
  }

  handleDelete(id: string) {
    this.facade.deleteRecipe(id);
  }
}
