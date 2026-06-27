import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If we are on the server, we don't have access to localStorage
  // Let the client handle the auth guard
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authService.getToken() !== null) {
    return true;
  }

  // Si no está autenticado en el cliente, redirigir al login
  return router.createUrlTree(['/auth']);
};
