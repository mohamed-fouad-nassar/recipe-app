import { Modal } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { ILink } from '../../layouts/app-layout';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink, FormsModule],
})
export class Header {
  @Input() links!: ILink[];

  auth = inject(AuthService);
  router = inject(Router);
  searchTerms: string = '';

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  focusInputManual() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }

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

  onSearch() {
    if (!this.searchTerms.trim()) return;

    this.router.navigate(['/search'], {
      queryParams: { q: this.searchTerms },
    });

    const $targetEl = document.getElementById('search-modal');
    const modal = new Modal($targetEl);
    modal.hide();

    this.searchTerms = '';
  }
}
