import { Component, inject } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  private userDataService = inject(UserDataService);
  private userData = "";

  fetchData() {
    this.userDataService.fetchData().subscribe(
      response => {
        console.log("user-page fetchData(): response: ", response);
        this.userData = JSON.stringify(response);
      },
      error => {
        console.log("user-page fetchData(): error: ", error);
      }
    );
  }

  display() {
    return this.userData;
  }
}
