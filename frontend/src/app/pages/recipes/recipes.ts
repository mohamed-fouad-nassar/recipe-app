import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  imports: [RouterLink],
})
export class Recipes {
  recipes = [1, 2, 3, 4, 5, 6];
}
