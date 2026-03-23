import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-screen p-4">
      <div
        class="mx-4 flex-1 w-full min-w-sm max-w-lg bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs"
      >
        <div class="w-28 mx-auto mb-4">
          <img src="/imgs/logo-2.png" alt="Logo" />
        </div>
        <router-outlet />
      </div>
    </div>
  `,
  imports: [RouterOutlet],
})
export class AuthLayout {}
