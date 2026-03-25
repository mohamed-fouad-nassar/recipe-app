import { Recipe } from '../recipes.model';
import { CommonModule } from '@angular/common';
import { Component, input, output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.html',
})
export class RecipeFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  initialData = input<Recipe | null>(null);
  submitForm = output<any>();
  cancel = output<void>();

  recipeForm!: FormGroup;

  ngOnInit() {
    this.recipeForm = this.fb.group({
      title: [this.initialData()?.title || '', [Validators.required, Validators.minLength(3)]],
      // category: [this.initialData()?.category || 'General', Validators.required],
      // time: [this.initialData()?.time || '', Validators.required],
      image: [this.initialData()?.image || '', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.submitForm.emit(this.recipeForm.value);
    }
  }
}
