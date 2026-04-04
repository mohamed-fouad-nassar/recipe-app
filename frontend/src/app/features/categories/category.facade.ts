import { Injectable, signal, inject } from '@angular/core';
import { CategoryService } from './categories.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryFacade {
  private categoryService = inject(CategoryService);

  categories = signal<any[]>([]);
  loading = signal(false);

  loadCategories() {
    this.loading.set(true);

    this.categoryService.fetchAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
