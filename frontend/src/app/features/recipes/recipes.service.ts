import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HomeRecipesResponse } from './recipes.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api';

  fetchHomeRecipes(): Observable<HomeRecipesResponse> {
    return this.http.get<HomeRecipesResponse>(`${this.baseUrl}/recipes?page=1&limit=3`);
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
}
