import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('token')) { //daca exista un token in localStorage, inseamna ca utilizatorul este deja logat, deci nu poate accesa pagina de login
    router.navigate(['/home']);
    return false;
  }

  return true;
};