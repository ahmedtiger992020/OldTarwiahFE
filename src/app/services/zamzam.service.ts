import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.staging';
import { ZamzamSearchCriteria } from '../models/zamzamSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class ZamzamService {

  constructor(private http: HttpClient) { }

  getZamZamLocations1(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/zamzam/GetZamZamLocations`);
  }
  
  getZamZamLocations(data: ZamzamSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/zamzam/GetZamZamLocations`, data);
  }

  importFile(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/zamzam/Import`, formData);
  }
}