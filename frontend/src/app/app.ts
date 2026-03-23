import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

export interface ILink {
  title: string;
  href: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  protected links: ILink[] = [
    { title: 'Home', href: '#' },
    { title: 'About', href: '#' },
    { title: 'recipes', href: '#' },
    { title: 'Contact', href: '#' },
  ];

  ngOnInit(): void {
    initFlowbite();
  }
}
