import { ILink } from '../../app';
import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink],
})
export class Header {
  @Input() links!: ILink[];
}
