import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ILink } from '../../layouts/app-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink],
})
export class Header {
  @Input() links!: ILink[];
}
