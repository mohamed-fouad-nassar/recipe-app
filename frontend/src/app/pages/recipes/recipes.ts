import { Component } from '@angular/core';
import { RecipeCard } from '../../features/recipes/recipe-card/recipe-card';
import { PaginationComponent } from '../../components/pagination/pagination';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  imports: [RecipeCard, PaginationComponent],
})
export class Recipes {
  recipes = Array.from({ length: 20 }, (_, i) => i + 1);
  current = 1;
  onPageClick = (page: number) => {};

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
