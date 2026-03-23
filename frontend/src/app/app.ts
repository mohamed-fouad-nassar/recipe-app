import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet],
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  ngOnInit(): void {
    initFlowbite();
  }
}
