import { Modal } from 'flowbite';
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

  modal!: Modal;

  openModal() {
    const el = document.getElementById('deleteModal-' + this.comment._id);
    if (!el) return;
    if (!this.modal) {
      this.modal = new Modal(el);
    }
    this.modal.show();
  }

  closeModal() {
    this.modal?.hide();
  }

  confirmDelete() {
    this.delete.emit(this.comment._id);
    this.closeModal();
  }

  get isOwner() {
    return this.comment.userId._id === this.currentUserId;
  }
}
