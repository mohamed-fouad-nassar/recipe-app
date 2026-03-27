import { Comment } from './comments.model';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsStore {
  comments = signal<Comment[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  setComments(comments: Comment[]) {
    this.comments.set(comments);
  }

  addComment(comment: Comment) {
    this.comments.update((list) => [comment, ...list]);
  }

  updateComment(updated: Comment) {
    this.comments.update((list) => list.map((c) => (c._id === updated._id ? updated : c)));
  }

  removeComment(commentId: string) {
    this.comments.update((list) => list.filter((c) => c._id !== commentId));
  }

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  setError(message: string | null) {
    this.error.set(message);
  }
}
