import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class MashaarService {

  constructor(private http: HttpClient) { }
  
  getAllMashaar(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/mashaar/GetAllMashaar`);
  }
}
