import { RouterLink } from '@angular/router';
import { RecipeStore } from '../recipe.store';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-recipe-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-recipe-card.html',
})
export class ProfileRecipeCard {
  private store = inject(RecipeStore);

  @Input() data!: any;
  @Output() onDelete = new EventEmitter<string | number>();

  getImageUrl(image: string | null | undefined): string {
    if (!image) return 'assets/placeholder.png';
    if (image.startsWith('https')) return image;
    return `http://localhost:5000/${image}`;
  }

  confirmDelete() {
    this.onDelete.emit(this.data._id);
  }

  toggleLike() {
    this.store.toggleLike(this.data._id);
  }

  toggleFavorite() {
    this.store.toggleFavorite(this.data._id);
  }
}
