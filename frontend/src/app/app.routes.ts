import { Routes } from '@angular/router';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { About } from './pages/about/about';
import { Recipe } from './pages/recipe/recipe';
import { Contact } from './pages/contact/contact';
import { Recipes } from './pages/recipes/recipes';
import { Profile } from './pages/profile/profile';
import { Register } from './pages/register/register';
import { AddRecipe } from './pages/add-recipe/add-recipe';
import { EditRecipe } from './pages/edit-recipe/edit-recipe';

// guards
import { authGuard, guestGuard } from './features/auth/auth.guard';
import { Search } from './pages/search/search';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'recipes', component: Recipes },
      { path: 'recipes/add', component: AddRecipe },
      { path: 'recipes/edit/:id', component: EditRecipe },
      { path: 'recipes/:id', component: Recipe },
      { path: 'search', component: Search },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'profile', component: Profile },
    ],
  },
];
