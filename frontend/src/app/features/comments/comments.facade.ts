import { Comment } from './comments.model';
import { CommentsStore } from './comments.store';
import { Injectable, inject } from '@angular/core';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsFacade {
  service = inject(CommentsService);
  store = inject(CommentsStore);

  loadComments(recipeId: string) {
    this.store.setLoading(true);
    this.store.setError(null);

    this.service.fetchComments(recipeId).subscribe({
      next: (res) => {
        this.store.setComments(res.data.comments);
        this.store.setLoading(false);
      },
      error: () => {
        this.store.setError('Failed to load comments');
        this.store.setLoading(false);
      },
    });
  }

  addComment(recipeId: string, content: string) {
    if (!content.trim()) return;
    this.service.addComment(recipeId, content).subscribe({
      next: (res) => {
        const comment = res.data?.comment || res.data.comment;
        this.store.addComment(comment);
      },
      error: () => {
        this.store.setError('Failed to add comment');
      },
    });
  }

  updateComment(commentId: string, content: string) {
    this.service.updateComment(commentId, content).subscribe({
      next: (res) => {
        const updated = res.data?.comment || res.data.comment;
        this.store.updateComment(updated);
      },
      error: () => {
        this.store.setError('Failed to update comment');
      },
    });
  }

  deleteComment(commentId: string) {
    this.service.deleteComment(commentId).subscribe({
      next: () => {
        this.store.removeComment(commentId);
      },
      error: () => {
        this.store.setError('Failed to delete comment');
      },
    });
  }
}
