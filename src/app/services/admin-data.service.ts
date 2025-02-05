import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private apiUrl = "http://localhost:8080/api/admin-data";
  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiUrl, { headers, withCredentials: true });
  }
}
