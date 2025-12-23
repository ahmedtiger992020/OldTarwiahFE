import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Lockup } from '../models/lockup.model';
import { environment } from '../../environments/environment.staging';
import { ToiletSearchCriteria } from '../models/toiletSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class ToiletService {

  constructor(private http: HttpClient) { }

  getToilets1(): Observable<Lockup>{
    return this.http.get<Lockup>(`${environment.apiUrl}/toilets/GetToilets`);
  }
  
  getToilets(data: ToiletSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/toilets/GetToilets`, data);
  }
  
  getAllToilets(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/toilets/GetAllToilets`);
  }

  importFile(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/toilets/Import`, formData);
  }
}
