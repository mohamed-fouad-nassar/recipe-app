// import {
//   Input,
//   inject,
//   OnInit,
//   Output,
//   OnChanges,
//   Component,
//   EventEmitter,
//   SimpleChanges,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CategoryFacade } from '../../categories/category.facade';
// import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-recipe-form',
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './recipe-form.html',
// })
// export class RecipeFormComponent implements OnInit, OnChanges {
//   fb = inject(FormBuilder);
//   categoryFacade = inject(CategoryFacade);

//   @Input() initialData: any = null;
//   @Output() submitForm = new EventEmitter<any>();
//   @Output() cancel = new EventEmitter<void>();

//   recipeForm = this.fb.group({
//     title: ['', Validators.required],
//     description: [''],
//     category: ['', Validators.required],
//     image: [''],
//     ingredients: this.fb.array([]),
//     steps: this.fb.array([]),
//   });

//   categories = this.categoryFacade.categories;
//   loadingCategories = this.categoryFacade.loading;

//   ngOnInit() {
//     this.categoryFacade.loadCategories();
//     if (!this.initialData) this.initEmptyForm();
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['initialData'] && this.initialData) this.setFormData(this.initialData.data.recipe);
//   }

//   private setFormData(data: any) {
//     this.recipeForm.patchValue({
//       title: data.title,
//       description: data.description,
//       image: data.image,
//       category: data.category?._id || data.category,
//     });

//     this.ingredients.clear();
//     this.steps.clear();

//     if (data.ingredients?.length) {
//       data.ingredients.forEach((ing: any) => this.addIngredient(ing));
//     } else {
//       this.addIngredient();
//     }

//     if (data.steps?.length) {
//       data.steps.forEach((step: any) => this.addStep(step));
//     } else {
//       this.addStep();
//     }
//   }

//   private initEmptyForm() {
//     this.addIngredient();
//     this.addStep();
//   }

//   get ingredients(): FormArray {
//     return this.recipeForm.get('ingredients') as FormArray;
//   }

//   get steps(): FormArray {
//     return this.recipeForm.get('steps') as FormArray;
//   }

//   addIngredient(ing: any = { name: '', quantity: '' }) {
//     this.ingredients.push(
//       this.fb.group({
//         name: [ing.name || '', Validators.required],
//         quantity: [ing.quantity || '', Validators.required],
//       }),
//     );
//   }

//   removeIngredient(index: number) {
//     this.ingredients.removeAt(index);
//   }

//   addStep(step: string = '') {
//     this.steps.push(this.fb.control(step || '', Validators.required));
//   }

//   removeStep(index: number) {
//     this.steps.removeAt(index);
//   }

//   onSubmit() {
//     if (this.recipeForm.invalid) {
//       this.recipeForm.markAllAsTouched();
//       return;
//     }

//     this.submitForm.emit(this.recipeForm.value);
//   }
// }

import {
  Input,
  inject,
  OnInit,
  Output,
  OnChanges,
  Component,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFacade } from '../../categories/category.facade';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.html',
})
export class RecipeFormComponent implements OnInit, OnChanges {
  fb = inject(FormBuilder);
  categoryFacade = inject(CategoryFacade);

  @Input() initialData: any = null;
  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    category: ['', Validators.required],
    image: [''],
    ingredients: this.fb.array([]),
    steps: this.fb.array([]),
  });

  image: File | null = null;
  imagePreview: string | null = null;

  categories = this.categoryFacade.categories;
  loadingCategories = this.categoryFacade.loading;

  ngOnInit() {
    this.categoryFacade.loadCategories();
    if (!this.initialData) this.initEmptyForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.initialData) {
      const recipe = this.initialData.data.recipe;
      this.setFormData(recipe);
      if (recipe.image) this.imagePreview = recipe.image;
    }
  }

  private setFormData(data: any) {
    this.recipeForm.patchValue({
      title: data.title || '',
      description: data.description || '',
      image: data.image || '',
      category: data.category?._id || data.category || '',
    });

    this.ingredients.clear();
    this.steps.clear();

    if (Array.isArray(data.ingredients) && data.ingredients.length) {
      data.ingredients.forEach((ing: any) => {
        this.ingredients.push(
          this.fb.group({
            name: [ing.name || '', Validators.required],
            quantity: [ing.quantity || '', Validators.required],
          }),
        );
      });
    } else this.addIngredient();

    if (Array.isArray(data.steps) && data.steps.length) {
      data.steps.forEach((step: any) => {
        this.steps.push(this.fb.control(step || '', Validators.required));
      });
    } else this.addStep();

    this.imagePreview = data.image || null;
  }

  private initEmptyForm() {
    this.addIngredient();
    this.addStep();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient(ing: any = { name: '', quantity: '' }) {
    this.ingredients.push(
      this.fb.group({
        name: [ing.name || '', Validators.required],
        quantity: [ing.quantity || '', Validators.required],
      }),
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep(step: string = '') {
    this.steps.push(this.fb.control(step || '', Validators.required));
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValue = this.recipeForm.value;

    const formData = new FormData();
    formData.append('title', String(formValue.title));
    formData.append('description', String(formValue.description || ''));
    formData.append('category', String(formValue.category));

    formData.append('ingredients', JSON.stringify(this.ingredients.value));
    formData.append('steps', JSON.stringify(this.steps.value));

    if (this.image) formData.append('image', this.image);
    else if (formValue.image) formData.append('image', String(formValue.image));

    this.submitForm.emit(formData);
  }
}
