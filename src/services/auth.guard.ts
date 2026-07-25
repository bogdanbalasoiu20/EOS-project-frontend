import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('token')) { //daca exista un token in localStorage, inseamna ca utilizatorul este deja logat, deci poate accesa pagina
    return true;
  }

  router.navigate(['/login']);
  return false;
};