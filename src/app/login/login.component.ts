import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CookieService]
})
export class LoginComponent {
  in_username: string = "";
  in_password: string = "";

  constructor(private loginService: LoginService, private cookieService: CookieService) {
  }

  login() {
    console.log("login(): cookie: ", this.cookieService.get("XSRF-TOKEN"));
    // if (!this.cookieService.check("XSRF-TOKEN")) {
      console.log("login() working");
      this.loginService.getCsrf().subscribe(
        response => {
          console.log("login(): response: ", response);
          this.doLogin();
        },
        error => {
          let html: string = error.error.text;
          let token = html.substring(html.indexOf("value=")+7, 1422);
          //this.cookieService.set("XSRF-TOKEN", token);
          console.log("login(): error: ", token);
          this.doLogin();
        }
      );
    // } else {
    //   this.doLogin();
    // }
  }

  doLogin() {
    let data = {
      username: this.in_username,
      password: this.in_password,
      _csrf: this.cookieService.get("XSRF-TOKEN")
    };
    
    this.loginService.login(data).subscribe(response => {
      console.log('doLign(): POST request response: ', response);
    }, error => {
      console.error('doLogin(): Error occured: ', error);
    });
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
