import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-profile-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-recipe-card.html',
})
export class ProfileRecipeCard {
  data = input.required<any>();

  onDelete = output<string | number>();
  confirmDelete() {
    this.onDelete.emit(this.data().id);
  }
}
