import { Component, inject, OnInit } from '@angular/core';
import { Spinner } from '../../components/spinner/spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message';
import { RecipeFacade } from '../../features/recipes/recipe-details.facade';
import { RecipeStore } from '../../features/recipes/recipe-details.store';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.html',
  imports: [Spinner, ErrorMessageComponent, RouterLink],
})
export class Recipe implements OnInit {
  facade = inject(RecipeFacade);
  store = inject(RecipeStore);
  route = inject(ActivatedRoute);

  recipe = this.store.selectedRecipe;
  loading = this.store.loading;
  error = this.store.error;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.facade.loadRecipe(id);
  }

  toggleLike() {
    const recipe = this.recipe();
    if (recipe) this.facade.toggleLike(recipe);
  }

  toggleFavorite() {
    const recipe = this.recipe();
    if (recipe) this.facade.toggleFavorite(recipe);
  }

  logRecipe() {
    console.log(this.recipe());
  }
}
