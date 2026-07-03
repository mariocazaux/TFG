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
        path: 'create-event/:id',
        loadComponent: () =>
          import('./features/create-event/create-event').then((m) => m.CreateEventComponent),
      },
      {
        path: 'create-route/:id',
        loadComponent: () =>
          import('./features/create-route/create-route').then((m) => m.CreateRouteComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/search/search-page/search-page.component').then(
            (m) => m.SearchPageComponent,
          ),
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./features/profile/public-profile/public-profile.component').then(
            (m) => m.PublicProfileComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];
