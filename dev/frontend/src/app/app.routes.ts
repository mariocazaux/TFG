import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/landing-page/landing-page.component';
import { authGuard } from './core/guards/auth.guard';

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
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/home-layout/home-layout.component').then(
        (m) => m.HomeLayoutComponent,
      ),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile-page/profile-page.component').then(
            (m) => m.ProfilePageComponent,
          ),
      },
      {
        path: 'map-explore',
        loadComponent: () =>
          import('./features/map-explore/map-explore').then((m) => m.MapExploreComponent),
      },
      {
        path: 'create-route',
        loadComponent: () =>
          import('./features/create-route/create-route').then((m) => m.CreateRouteComponent),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./features/event-feed/event-feed').then((m) => m.EventFeedComponent),
      },
      {
        path: 'create-event',
        loadComponent: () =>
          import('./features/create-event/create-event').then((m) => m.CreateEventComponent),
      },
      {
        path: 'edit-event/:id',
        loadComponent: () =>
          import('./features/create-event/create-event').then((m) => m.CreateEventComponent),
      },
      {
        path: 'edit-route/:id',
        loadComponent: () =>
          import('./features/create-route/create-route').then((m) => m.CreateRouteComponent),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];
