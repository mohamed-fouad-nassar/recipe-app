import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HomeRecipesResponse, PaginatedResponse, Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/recipes';

  fetchHomeRecipes(): Observable<HomeRecipesResponse> {
    return this.http.get<HomeRecipesResponse>(`${this.baseUrl}?page=1&limit=3`);
  }

  // fetchTrendingRecipes(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(`${this.baseUrl}/trending`);
  // }
}
