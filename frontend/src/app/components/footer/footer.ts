import { ILink } from '../../app';
import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [RouterLink],
})
export class Footer {
  @Input() links!: ILink[];
  protected readonly year = signal(new Date().getFullYear());
}
