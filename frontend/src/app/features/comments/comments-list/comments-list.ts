import { Comment } from '../comments.model';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentCard } from '../comment-card/comment-card';
import { CommentForm } from '../comment-form/comment-form';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [NgIf, NgFor, CommentCard, CommentForm],
  templateUrl: './comments-list.html',
})
export class CommentsListComponent {
  @Input() comments: Comment[] = [];
  @Input() currentUserId!: string;

  editingComment: Comment | null = null;

  @Input() onAdd!: (text: string) => void;
  @Input() onUpdate!: (id: string, text: string) => void;
  @Input() onDelete!: (id: string) => void;

  startEdit(comment: Comment) {
    this.editingComment = comment;
  }

  cancelEdit() {
    this.editingComment = null;
  }
}
