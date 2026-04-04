import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../../features/recipes/recipes.service';
import { RecipeFormComponent } from '../../features/recipes/recipe-form/recipe-form';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.html',
  imports: [RecipeFormComponent],
})
export class EditRecipe {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  recipe = signal<any>(null);
  isLoading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.recipeService.fetchRecipeById(id).subscribe({
      next: (res) => {
        this.recipe.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  handleUpdate(data: any) {
    const id = this.route.snapshot.paramMap.get('id');

    this.recipeService.updateRecipe(id!, data).subscribe({
      next: () => {
        this.router.navigate(['/profile/my-recipes']);
      },
    });
  }

  goBack() {
    this.router.navigate(['/profile/my-recipes']);
  }
}
