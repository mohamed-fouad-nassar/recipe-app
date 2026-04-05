import { Recipe } from '../recipes.model';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.html',
  host: { class: 'block' },
  imports: [NgClass, RouterLink, NgIf],
})
export class RecipeCard {
  @Input() data!: Recipe;
  @Input() showLike: boolean = true;
  @Input() showFavorite: boolean = true;

  @Output() toggleLike = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<void>();

  getImageUrl(image: string | null | undefined): string {
    if (!image) return 'assets/placeholder.png';
    if (image.startsWith('https')) return image;
    return `http://localhost:5000/${image}`;
  }

  logShowActs() {
    console.log('likes: ', this.showLike, 'favorites:', this.showFavorite);
  }
}
