import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HomeRecipesResponse, RecipeDetails } from './recipes.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api';

  fetchHomeRecipes(): Observable<HomeRecipesResponse> {
    return this.http.get<HomeRecipesResponse>(`${this.baseUrl}/recipes?page=1&limit=3`);
  }

  fetchAllRecipes(options: { search?: string; page?: number; limit?: number; category?: string }) {
    let params = new HttpParams();
    if (options.search) params = params.set('search', options.search.trim());
    if (options.page) params = params.set('page', options.page.toString());
    if (options.limit) params = params.set('limit', options.limit.toString());
    if (options.category) params = params.set('category', options.category);
    return this.http.get<any>(`${this.baseUrl}/recipes`, { params });
  }

  fetchRecipeById(id: string) {
    return this.http.get<{ data: { recipe: RecipeDetails } }>(`${this.baseUrl}/recipes/${id}`);
  }

  likeRecipe(id: string) {
    return this.http.post(`${this.baseUrl}/likes/${id}`, {});
  }

  unlikeRecipe(id: string) {
    return this.http.delete(`${this.baseUrl}/likes/${id}`);
  }

  favoriteRecipe(id: string) {
    return this.http.post(`${this.baseUrl}/favorites/${id}`, {});
  }

  unfavoriteRecipe(id: string) {
    return this.http.delete(`${this.baseUrl}/favorites/${id}`);
  }

  getMyRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/me`);
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/favorites`);
  }

  getLiked(): Observable<any> {
    return this.http.get(`${this.baseUrl}/likes`);
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`);
  }
}
