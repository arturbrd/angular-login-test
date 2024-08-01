import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  // const jwtToken = getJwtToken();
  // if (jwtToken) {
  //   const cloned = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     }
  //   });
  //   return next(cloned);
  // }
  // return next(req);
  const router = inject(Router);
  return next(req).pipe(
    
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Handle 403 error: Redirect to login page or error page
        router.navigate(['/login']); // Example route for 403 error page
        alert("Musisz się zalogować")
      }
      return throwError(() => new Error);
    })
  );
};

// function getJwtToken(): string | null {
//   return localStorage.getItem("jwt_token");
// }

