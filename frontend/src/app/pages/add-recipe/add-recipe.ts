import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { RecipeService } from '../../features/recipes/recipes.service';
import { RecipeFormComponent } from '../../features/recipes/recipe-form/recipe-form';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.html',
  imports: [RecipeFormComponent],
})
export class AddRecipe {
  router = inject(Router);
  recipeService = inject(RecipeService);
  isSubmitting = false;

  handleCreate(data: any) {
    this.isSubmitting = true;
    this.recipeService.createRecipe(data).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.router.navigate(['/profile/my-recipes']);
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/profile/my-recipes']);
  }
}
