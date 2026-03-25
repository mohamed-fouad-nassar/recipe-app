import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipes-section',
  templateUrl: './recipes-section.html',
  host: { class: 'block' },
  imports: [RecipeCard, RouterLink],
})
export class RecipesSection {
  handleLike(recipeId: string) {
    return '';
  }

  handleFavorite(recipeId: string) {
    return '';
  }

  item = {
    id: '1',
    image: '/imgs/recipe-1.avif',
    title: 'Creamy Garlic Pasta',
    category: 'Dinner',
    author: 'Chef Mario',
    time: '13 Min',
    likes: 12,
    isLiked: true,
    isFavorite: false,
  };
}
