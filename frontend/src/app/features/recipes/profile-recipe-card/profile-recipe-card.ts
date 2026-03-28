// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Component, input, output } from '@angular/core';

// @Component({
//   selector: 'app-profile-recipe-card',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './profile-recipe-card.html',
// })
// export class ProfileRecipeCard {
//   data = input.required<any>();

//   onDelete = output<string | number>();
//   confirmDelete() {
//     this.onDelete.emit(this.data()._id);
//   }
// }

import { RouterLink } from '@angular/router';
import { RecipeStore } from '../recipe.store';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-recipe-card',
  standalone: true,
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
