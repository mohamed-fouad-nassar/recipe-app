import { Recipe } from '../recipes.model';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.html',
  host: { class: 'block' },
  imports: [NgClass, RouterLink],
})
export class RecipeCard {
  data = input.required<Recipe>();

  toggleLike = output<void>();
  toggleFavorite = output<void>();
}
