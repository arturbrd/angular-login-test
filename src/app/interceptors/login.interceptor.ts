import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      }
    });
    return next(cloned);
  }
  return next(req);
};

function getJwtToken(): string | null {
  return localStorage.getItem("jwt_token");
}

