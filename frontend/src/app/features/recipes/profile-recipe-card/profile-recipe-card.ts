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
