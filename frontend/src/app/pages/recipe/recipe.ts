import { Component, inject, OnInit } from '@angular/core';
import { Spinner } from '../../components/spinner/spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { CommentsStore } from '../../features/comments/comments.store';
import { CommentsFacade } from '../../features/comments/comments.facade';
import { RecipeStore } from '../../features/recipes/recipe-details.store';
import { RecipeFacade } from '../../features/recipes/recipe-details.facade';
import { ErrorMessageComponent } from '../../components/error-message/error-message';
import { CommentsListComponent } from '../../features/comments/comments-list/comments-list';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.html',
  imports: [Spinner, ErrorMessageComponent, RouterLink, CommentsListComponent],
})
export class Recipe implements OnInit {
  facade = inject(RecipeFacade);
  store = inject(RecipeStore);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  commentsFacade = inject(CommentsFacade);
  commentsStore = inject(CommentsStore);

  recipe = this.store.selectedRecipe;
  loading = this.store.loading;
  error = this.store.error;
  comments = this.commentsStore.comments;
  currentUserId = this.authService.getCurrentUserId();
  recipeId!: string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.recipeId = id;
    this.facade.loadRecipe(id);
    this.commentsFacade.loadComments(id);
  }

  toggleLike() {
    const recipe = this.recipe();
    if (recipe) this.facade.toggleLike(recipe);
  }

  toggleFavorite() {
    const recipe = this.recipe();
    if (recipe) this.facade.toggleFavorite(recipe);
  }

  addComment(content: string) {
    this.commentsFacade.addComment(this.recipeId, content);
  }

  updateComment(commentId: string, content: string) {
    this.commentsFacade.updateComment(commentId, content);
  }

  deleteComment(commentId: string) {
    this.commentsFacade.deleteComment(commentId);
  }

  logRecipe() {
    console.log(this.recipe());
  }

  logComments() {
    console.log(this.comments());
  }

  logUserId() {
    console.log(this.currentUserId);
  }
}
