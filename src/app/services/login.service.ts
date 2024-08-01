import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


interface Response {
  username: string,
  role: string,
  expires: string
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiLoginUrl = 'http://localhost:8080/login';
  private apiLogoutUrl = 'http://localhost:8080/logout';
  private apiRefreshUrl = 'http://localhost:8080/refresh';
  public loggedUser: string = "";
  private timeout: number | null = null;

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) { }

  login(data: {username: string, password: string, _csrf: string}): Observable<any> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiLoginUrl, data, { headers, withCredentials: true })
      .pipe(tap((resp) => this.afterLogin(resp)));
  }

  afterLogin(resp: Response) {
    sessionStorage.setItem("loggedIn", "true");
    // this.isAuthSub.next(true);
    let expires = new Date(resp.expires);
    console.log("resp.expires: ", resp.expires, "\nexpires: ", expires);
    this.cookie.set("username", resp.username, expires);
    this.cookie.set("role", resp.role, expires);
    this.cookie.set("expires", expires.toUTCString(), expires);
    const now = new Date();
    const cookieTime = new Date(this.cookie.get("expires"));
    console.log("now: ", now, "\ncookieTime: ", cookieTime, "\nraw cookie: ", this.cookie.get("expires"));
    console.log(resp);
    this.timeout = setTimeout(() => {
        if (confirm("Sesja wkrótce wygasa! Przedłużyć?")) {
          this.refresh();
        } else {
          this.logout();   
        }
      }, (new Date(this.cookie.get("expires")).getTime()-now.getTime()-8000));
  }
  

  logout(): void {
    console.log("logout())");
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.http.get<any>(this.apiLogoutUrl, { withCredentials: true }).subscribe({
      complete: () => {
        this.router.navigate(['/main-page']);
        this.cookie.delete("username");
        this.cookie.delete("role");
        this.cookie.delete("expires");
      },
      error: () => {
        alert("Nie udało się wylogować");
        this.router.navigate(['/main-page']);
        this.cookie.delete("username");
        this.cookie.delete("role");
        this.cookie.delete("expires");
      }
    })
    
  }

  refresh() {
    console.log("refresh()")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get<any>(this.apiRefreshUrl, { headers, withCredentials: true })
      .pipe(tap((resp) => this.afterLogin(resp))).subscribe();
  }

  isLoggedIn() {
    return this.cookie.check("username");
  }

  isAdmin() {
    return this.cookie.get("role") == "ROLE_ADMIN";
  }

  getCsrf(): Observable<any> {
    console.log("getCsrf(): dziala");
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-from-urlencoded' });
    return this.http.get<any>(this.apiLoginUrl, { headers, withCredentials: true });
  }

  isExpired(): boolean {
    let expired = false;

    if (this.cookie.check("username")) {
      const now = new Date();
      if (!this.cookie.check("expires") || (new Date(this.cookie.get("expires"))) <= now) {
        this.logout();
        expired = true;
      }
    }
    console.log("isExpired(): ", expired);
    
    return expired;
  }

  getUser() {
    return this.cookie.get("username");
  }

  onInit() {
    console.log("onInit login service()")
    if (this.cookie.check("expires")) {
      const now = new Date();
      this.timeout = setTimeout(() => {
        if (confirm("Sesja wkrótce wygasa! Przedłużyć?")) {
          this.refresh();
        } else {
          this.logout();   
        }
      }, (new Date(this.cookie.get("expires")).getTime()-now.getTime()-8000));
    }
  }
  
}
