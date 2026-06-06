import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth-page/auth-page.component').then((m) => m.AuthPageComponent),
  },
];
