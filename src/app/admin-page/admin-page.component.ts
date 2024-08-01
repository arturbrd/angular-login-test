import { Component, inject } from '@angular/core';
import { AdminDataService } from '../services/admin-data.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  private adminDataService = inject(AdminDataService);
  private adminData = "";

  getAdminInfo() {
    this.adminDataService.fetchData().subscribe(
      response => {
        console.log("admin-page fetchData(): response: ", response);
        this.adminData = JSON.stringify(response);
      },
      error => {
        console.log("admin-page fetchData(): error: ", error);
      }
    );
  }

  display() {
    return this.adminData;
  }
}
