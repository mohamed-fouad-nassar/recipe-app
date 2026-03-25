import { Component, signal } from '@angular/core';
import { Recipe } from '../../models/recipes.model';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.html',
  imports: [RecipeFormComponent],
})
export class EditRecipe {
  currentRecipe = signal<Recipe | null>(null);

  handleUpdate(formData: any) {
    const id = this.currentRecipe()?.id;
    if (!id) return;
    console.log('Updating Recipe:', id, formData);
  }

  goBack() {}
}
