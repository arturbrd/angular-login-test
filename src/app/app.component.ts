import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angtest';
  loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn() && !this.loginService.isExpired();
  }

}
