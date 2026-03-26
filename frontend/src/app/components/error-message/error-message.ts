import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.html',
})
export class ErrorMessageComponent {
  @Input() message?: string | null;
}
