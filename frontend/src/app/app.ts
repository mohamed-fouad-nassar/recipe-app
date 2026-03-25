import { filter } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet],
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  private router = inject(Router);

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => {
        initFlowbite();
      }, 0);
    });
  }
}
