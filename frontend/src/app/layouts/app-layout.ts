import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

export interface ILink {
  title: string;
  href: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <app-header [links]="links" />
    <main class="min-h-screen px-4 pt-27.5">
      <div class="max-w-7xl mx-auto">
        <router-outlet />
      </div>
    </main>
    <app-footer [links]="links" />
  `,
  imports: [RouterOutlet, Footer, Header],
})
export class AppLayout {
  protected links: ILink[] = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Recipes', href: '/recipes' },
    { title: 'Contact', href: '/contact' },
  ];
}
