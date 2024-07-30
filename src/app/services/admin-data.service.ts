import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private apiUrl = "http://localhost:80/api/secret";
  private smth = false;
  constructor(private http: HttpClient) { }

  requestAdminData(): Observable<any> {
    console.log("requestAdminData fn");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = { user_name: "foo" };
    return this.http.post<any>(this.apiUrl, data, { headers }).pipe(tap((resp) => {
      this.smth = true;
    }));
  }
}
