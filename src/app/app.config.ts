import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule,   } from '@auth0/angular-jwt';
import { loginInterceptor } from './interceptors/login.interceptor';
import { csrfInterceptor } from './interceptors/csrf.interceptor';

function tokenGetter() {
  return localStorage.getItem("jwt_token");
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter
    }
  })), provideHttpClient(withInterceptors([csrfInterceptor, loginInterceptor]), withInterceptorsFromDi())],
};
