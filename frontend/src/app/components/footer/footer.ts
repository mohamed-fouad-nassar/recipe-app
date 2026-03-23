import { RouterLink } from '@angular/router';
import { ILink } from '../../layouts/app-layout';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [RouterLink],
})
export class Footer {
  @Input() links!: ILink[];
  protected readonly year = signal(new Date().getFullYear());
}
