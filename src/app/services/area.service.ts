import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lockup } from '../models/lockup.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.staging';
import { AreaSearchCriteria } from '../models/areaSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  getAreas1(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/area/GetAreas`);
  }
  
  getAreas(data: AreaSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/areas/GetAreas`, data);
  }
  
  getAllActiveAreas(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/areas/GetAllActiveAreas`);
  }

  importFile(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/areas/Import`, formData);
  }
}
