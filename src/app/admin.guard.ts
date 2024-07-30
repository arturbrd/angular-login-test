import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let routerService = inject(Router);
  
  if(!loginService.isAdmin()) {
    alert("You are not an admin");
    routerService.navigate(["/user-page"]);
    return false
  }
  return true;
};
