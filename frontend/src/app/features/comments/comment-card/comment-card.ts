import { DatePipe } from '@angular/common';
import { Comment } from '../comments.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  imports: [DatePipe],
  templateUrl: './comment-card.html',
  host: { class: 'block' },
})
export class CommentCard {
  @Input() comment!: Comment;
  @Input() currentUserId!: string;

  @Output() edit = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<string>();

  get isOwner() {
    return this.comment.userId._id === this.currentUserId;
  }

  confirmDelete() {
    this.delete.emit(this.comment._id);
  }
}
