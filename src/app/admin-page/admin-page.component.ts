import { HttpClient } from '@angular/common/http';
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

  getAdminInfo() {
    this.adminDataService.requestAdminData().subscribe(response => {
      console.log('POST request response: ', response);
    }, error => {
      console.error('Error occured: ', error);
    });;
  }
}
