import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipe } from '../../features/recipes/recipes.model';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RecipeService } from '../../features/recipes/recipes.service';
import { RecipeCard } from '../../features/recipes/recipe-card/recipe-card';
import { PaginationComponent } from '../../components/pagination/pagination';

@Component({
  selector: 'app-search',
  imports: [RecipeCard, PaginationComponent, RouterLink],
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  searchQuery = signal<string>('');
  results = signal<Recipe[]>([]);
  isLoading = signal<boolean>(false);
  total = signal<number>(0);
  page = signal<number>(1);
  limit = signal<number>(12);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const q = params['q'] || '';
      this.searchQuery.set(q);
      this.page.set(+params['page'] || 1);
      this.limit.set(+params['limit'] || 12);
      this.performSearch(q, this.page(), this.limit());
    });
  }

  performSearch(query: string, page: number, limit: number) {
    if (!query) {
      this.results.set([]);
      this.total.set(0);
      return;
    }
    this.isLoading.set(true);
    this.recipeService.fetchAllRecipes({ search: query, page, limit }).subscribe({
      next: (res) => {
        this.results.set(res.data.recipes || []);
        this.total.set(res.total || 0);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onPageClick(newPage: number) {
    this.router.navigate([], {
      queryParams: { q: this.searchQuery(), page: newPage, limit: this.limit() },
      queryParamsHandling: 'merge',
    });
  }
}
