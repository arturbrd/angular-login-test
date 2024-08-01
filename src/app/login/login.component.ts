import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: []
})
export class LoginComponent {
  in_username: string = "";
  in_password: string = "";
  loginFailed: boolean = false;

  private loginService = inject(LoginService);
  private cookieService = inject(CookieService);  

  login() {
    this.cookieService.delete("XSRF-TOKEN");
    console.log("login() working");
    this.loginService.getCsrf().subscribe(
      response => {
        console.log("login(): response: ", response);
        this.cookieService.set("XSRF-TOKEN", response.token);
        this.doLogin();
      },
      error => {
        console.log("login(): error: ", error);
      }
    );
  }

  doLogin() {
    let data = {
      username: this.in_username,
      password: this.in_password,
      _csrf: this.cookieService.get("XSRF-TOKEN")
    };
    
    this.loginService.login(data).subscribe(
      response => {
        console.log('doLogin(): POST request response: ', response);
        this.cookieService.delete("XSRF-TOKEN");
      }, error => {
        console.error('doLogin(): Error occured: ', error);
        this.loginFailed = true;
        setTimeout(() => {this.loginFailed = false}, 1800);
        this.cookieService.delete("XSRF-TOKEN");
      });
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  getUser(): String  {
    const username = this.loginService.getUser();
    return username == null ? "" : username;
  }
}
