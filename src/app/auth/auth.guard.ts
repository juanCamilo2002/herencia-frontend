import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../core/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);

  const accessToken = tokenService.getAccessToken();

  if(!accessToken) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}
