import { Component, signal } from '@angular/core';
import { Recipe } from '../../features/recipes/recipes.model';
import { RecipeFormComponent } from '../../features/recipes/recipe-form/recipe-form';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.html',
  imports: [RecipeFormComponent],
})
export class EditRecipe {
  currentRecipe = signal<Recipe | null>(null);

  handleUpdate(formData: any) {
    const id = this.currentRecipe()?._id;
    if (!id) return;
    console.log('Updating Recipe:', id, formData);
  }

  goBack() {}
}
