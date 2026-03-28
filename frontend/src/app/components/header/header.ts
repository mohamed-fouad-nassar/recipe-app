import { Collapse, Dropdown, Modal } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { ILink } from '../../layouts/app-layout';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { Component, ElementRef, HostListener, inject, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink, RouterLinkActive, FormsModule],
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

  closeDropdown() {
    const $targetEl = document.getElementById('user-dropdown');
    if ($targetEl) {
      $targetEl.classList.add('hidden');
    }
  }

  closeMobileMenu() {
    const $targetEl = document.getElementById('navbar-user');
    const $button = document.querySelector(
      '[data-collapse-toggle="navbar-user"]',
    ) as HTMLButtonElement;
    if ($targetEl && !$targetEl.classList.contains('hidden')) {
      $targetEl.classList.add('hidden');
      $button?.setAttribute('aria-expanded', 'false');
    }
  }

  openMobileMenu() {
    const $targetEl = document.getElementById('navbar-user');
    const $button = document.querySelector(
      '[data-collapse-toggle="navbar-user"]',
    ) as HTMLButtonElement;
    if ($targetEl && $targetEl.classList.contains('hidden')) {
      $targetEl.classList.remove('hidden');
      $button?.setAttribute('aria-expanded', 'true');
    }
  }

  onNavLinkClick() {
    this.closeMobileMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navbar = document.getElementById('navbar-user');
    const button = document.querySelector('[data-collapse-toggle="navbar-user"]');
    const target = event.target as HTMLElement;

    // Close menu if it's open and click is outside navbar and button
    if (navbar && !navbar.classList.contains('hidden')) {
      if (!navbar.contains(target) && !button?.contains(target)) {
        this.closeMobileMenu();
      }
    }
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
