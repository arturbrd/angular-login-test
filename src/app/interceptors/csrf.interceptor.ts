import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  let csrfToken = cookieService.get("XSRF-TOKEN");
  console.log(`interceptor csrfToken: ${csrfToken}`);
  if (csrfToken) {
    console.log("interceptor: smth hp");
    const cloned = req.clone({
      setHeaders: {
        "X-XSRF-TOKEN": `${csrfToken}`,
      }
    });
    return next(cloned);
  }
  return next(req);
};
