import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.staging';
import { CampaignSearchCriteria } from '../models/campaignSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  
  constructor(private http: HttpClient) { }

  getCampaigns1(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/campaign/GetCampaigns`);
  }
  
  getCampaigns(data: CampaignSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/campaign/GetCampaigns`, data);
  }

  importFile(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/campaign/Import`, formData);
  }
}
