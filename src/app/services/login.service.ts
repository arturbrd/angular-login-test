import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login';
  private tokenName = "jwt_token";
  private isAuthSub = new BehaviorSubject<boolean>(false);
  private loggedUser: string = "";
  private jwtHelper = inject(JwtHelperService);

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  login(data: {username: string, password: string, _csrf: string}): Observable<any> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
     });

    let params = new HttpParams();
    params = params.set("username", data.username);
    params = params.set("password", data.password);
    params = params.set("_csrf", this.cookieService.get("XSRF-TOKEN"));
    console.log(`login(): params.toString(): ${params.toString()}`)



    return this.http.post<any>(this.apiUrl, params.toString(), { headers, withCredentials: true })
      .pipe(tap((tokens) => {
        this.loggedUser = data.username;
        localStorage.setItem(this.tokenName, tokens.jwt);
        this.isAuthSub.next(true);
      }));
  }

  logout(): void {
    console.log("logout())");
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/main-page']);
    this.isAuthSub.next(false);
  }

  isLoggedIn() {
    return this.isAuthSub.value;
  }

  isAdmin() {
    let decoded = this.jwtHelper.decodeToken();
    console.log("isAdmin(): ", decoded);
    if (decoded.admin) return true;
    return false;
  }

  getCsrf(): Observable<any> {
    console.log("getCsrf(): dziala");
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-from-urlencoded' });
    return this.http.get<any>(this.apiUrl, { headers, withCredentials: true });
  }
}
