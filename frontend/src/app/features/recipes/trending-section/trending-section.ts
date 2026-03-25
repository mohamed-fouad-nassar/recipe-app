import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trending-section',
  templateUrl: './trending-section.html',
  host: { class: 'block' },
  imports: [RouterLink],
})
export class TrendingSection {}
