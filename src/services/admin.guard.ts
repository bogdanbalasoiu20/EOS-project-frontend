import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('role') === 'ADMIN') {
    return true;
  }

  router.navigate(['/home']);
  return false;
};