import { RouterLink } from '@angular/router';
import { Component, signal } from '@angular/core';
import { ProfileRecipeCard } from '../../features/recipes/profile-recipe-card/profile-recipe-card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [RouterLink, ProfileRecipeCard],
})
export class Profile {
  userRecipes = signal<any[]>([
    {
      id: 1,
      title: 'Roasted Herb Chicken',
      image: '/imgs/recipe-1.avif',
      likes: 450,
      comments: 24,
    },
    { id: 2, title: 'Spicy Rigatoni', image: '/imgs/recipe-1.avif', likes: 120, comments: 10 },
  ]);

  handleDelete(id: string | number) {
    console.log('Deleting recipe with ID:', id);
  }
}
