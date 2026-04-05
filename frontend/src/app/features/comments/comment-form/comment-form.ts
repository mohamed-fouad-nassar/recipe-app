import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule, NgIf],
  templateUrl: './comment-form.html',
})
export class CommentForm {
  @Input() initialValue = '';
  @Input() isEdit = false;

  @Output() submitForm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  content = '';

  ngOnInit() {
    this.content = this.initialValue;
  }

  submit() {
    if (!this.content.trim()) return;
    this.submitForm.emit(this.content);
    this.content = '';
  }
}
