import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let routerService = inject(Router);

  if(!loginService.isLoggedIn()) {
    alert("You must be logged in to access that site");
    routerService.navigate(["/login"]);
    return false
  }
  return true;
};
