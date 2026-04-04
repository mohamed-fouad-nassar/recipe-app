import { CategoryFacade } from '../category.facade';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.html',
  host: { class: 'block' },
})
export class CategoriesSection implements OnInit {
  private categoryFacade = inject(CategoryFacade);

  categories = this.categoryFacade.categories;
  loading = this.categoryFacade.loading;

  ngOnInit(): void {
    this.categoryFacade.loadCategories();
  }
}
