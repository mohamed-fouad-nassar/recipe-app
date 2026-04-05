import { Observable } from 'rxjs';
import { Comment } from './comments.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/comments';

  fetchComments(recipeId: string): Observable<{ data: { comments: Comment[] } }> {
    return this.http.get<{ data: { comments: Comment[] } }>(`${this.baseUrl}/${recipeId}`);
  }

  addComment(recipeId: string, content: string): Observable<{ data: { comment: Comment } }> {
    return this.http.post<{ data: { comment: Comment } }>(`${this.baseUrl}/${recipeId}`, {
      content,
    });
  }

  updateComment(commentId: string, content: string): Observable<{ data: { comment: Comment } }> {
    return this.http.patch<{ data: { comment: Comment } }>(`${this.baseUrl}/${commentId}`, {
      content,
    });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`);
  }
}
