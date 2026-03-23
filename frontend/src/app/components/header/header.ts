import { Router, RouterLink } from '@angular/router';
import { Component, inject, Input } from '@angular/core';
import { ILink } from '../../layouts/app-layout';
import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink],
})
export class Header {
  @Input() links!: ILink[];

  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err) => {
        console.log(err);

        this.auth['clearSession']();
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
