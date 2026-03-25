import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  host: { class: 'block' },
  imports: [RouterLink],
})
export class HeroSection {}
