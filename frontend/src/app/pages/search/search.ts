import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipes.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RecipeCard } from '../../components/recipe-card/recipe-card';

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
    this.results.set([
      {
        id: '1',
        image: '/imgs/recipe-1.avif',
        title: 'Creamy Garlic Pasta',
        category: 'Dinner',
        author: 'Chef Mario',
        time: '13 Min',
        likes: 12,
        isLiked: true,
        isFavorite: false,
      },
    ]);
    this.isLoading.set(false);
  }
}
