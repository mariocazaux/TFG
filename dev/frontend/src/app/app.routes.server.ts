import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'app/create-event/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'app/create-route/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'app/user/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
