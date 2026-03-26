import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  host: { class: 'block' },
  templateUrl: './spinner.html',
})
export class Spinner {
  @Input() message?: string;
}
