import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../../features/recipes/recipes.model';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RecipeCard } from '../../features/recipes/recipe-card/recipe-card';

@Component({
  selector: 'app-search-',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCard],
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private route = inject(ActivatedRoute);
  // private recipeService = inject(RecipeService);

  searchQuery = signal<string>('');
  results = signal<Recipe[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const q = params['q'] || '';
      this.searchQuery.set(q);
      this.performSearch(q);
    });
  }

  performSearch(query: string) {
    this.isLoading.set(true);
    // this.recipeService.searchRecipes(query).subscribe({
    //   next: (data) => {
    //     this..set(data);
    //     this.isLoading.set(false);
    //   },
    //   error: () => this.isLoading.set(false),
    // });
    new Promise((resolve) => setTimeout(resolve, 1000));
    this.results.set([]);
    this.isLoading.set(false);
  }
}
