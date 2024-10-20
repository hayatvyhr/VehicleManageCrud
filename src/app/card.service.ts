import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:8088/borkizi'; // Base URL for your API

  constructor(private http: HttpClient) { }

  // Fetch all homes
  getAllHomes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getallhomes`);
  }


}
