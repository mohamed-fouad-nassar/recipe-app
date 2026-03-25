import { Component } from '@angular/core';
import { RecipeFormComponent } from '../../features/recipes/recipe-form/recipe-form';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.html',
  imports: [RecipeFormComponent],
})
export class AddRecipe {
  handleCreate(formData: any) {
    console.log('Creating Recipe:', formData);
  }

  goBack() {}
}
