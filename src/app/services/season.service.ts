import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SeasonVM } from '../models/season.model';
import { environment } from '../../environments/environment.staging';
import { SeasonSearchCriteria } from '../models/seasonSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient) { 

  }
  
  getActiveSeason(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/seasons/GetActiveSeason`);
  }
  
  getSeasons(data: SeasonSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/seasons/GetSeasons`, data);
  }
  
  addSeason(data: SeasonVM, userId: number): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/seasons/createSeason?userId=${userId}`, data);
  }
}
