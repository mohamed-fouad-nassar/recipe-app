import { Routes } from '@angular/router';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Home },
      { path: 'register', component: Home },
    ],
  },
  {
    path: '',
    component: AppLayout,
    // canActivate: [authGard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'recipes', component: Home },
      { path: 'about', component: Home },
      { path: 'contact', component: Home },
      { path: 'profile', component: Home },
    ],
  },
];
