import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Spinner } from '../../components/spinner/spinner';
import { RecipeFacade } from '../../features/recipes/recipe.facade';
import { CategoryFacade } from '../../features/categories/category.facade';
import { RecipeCard } from '../../features/recipes/recipe-card/recipe-card';
import { PaginationComponent } from '../../components/pagination/pagination';
import { ErrorMessageComponent } from '../../components/error-message/error-message';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  imports: [RecipeCard, PaginationComponent, Spinner, ErrorMessageComponent],
})
export class Recipes implements OnInit {
  facade = inject(RecipeFacade);
  route = inject(ActivatedRoute);
  router = inject(Router);

  categoryFacade = inject(CategoryFacade);

  categories = this.categoryFacade.categories;
  categoriesLoading = this.categoryFacade.loading;

  recipes = this.facade.recipes;
  loading = this.facade.store.loading;
  error = this.facade.store.error;
  total = this.facade.store.total;
  filters = this.facade.store.filters;

  ngOnInit() {
    this.categoryFacade.loadCategories();

    this.route.queryParams.subscribe((params) => {
      this.facade.store.filters.set({
        page: +params['page'] || 1,
        limit: +params['limit'] || 12,
        category: params['category'] || '',
      });

      this.facade.loadRecipes();
    });
  }

  onPageClick(page: number) {
    this.router.navigate([], {
      queryParams: {
        ...this.filters(),
        page,
      },
      queryParamsHandling: 'merge',
    });
  }

  onCategoryChange(category: string) {
    this.router.navigate([], {
      queryParams: {
        ...this.filters(),
        category,
        page: 1,
      },
    });
  }
}
