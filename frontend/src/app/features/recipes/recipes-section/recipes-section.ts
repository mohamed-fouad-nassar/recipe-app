import { RouterLink } from '@angular/router';
import { RecipeFacade } from '../recipe.facade';
import { RecipeCard } from '../recipe-card/recipe-card';
import { Component, inject, OnInit } from '@angular/core';
import { Spinner } from '../../../components/spinner/spinner';
import { ErrorMessageComponent } from '../../../components/error-message/error-message';

@Component({
  selector: 'app-recipes-section',
  templateUrl: './recipes-section.html',
  host: { class: 'block' },
  imports: [RecipeCard, RouterLink, Spinner, ErrorMessageComponent],
})
export class RecipesSection implements OnInit {
  facade = inject(RecipeFacade);

  recipes = this.facade.recipes;
  loading = this.facade.store.loading;
  error = this.facade.store.error;

  ngOnInit() {
    this.facade.loadHomeRecipes();
  }
}
