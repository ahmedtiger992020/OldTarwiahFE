import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class GisService {

  constructor(private http: HttpClient) { 

  }
  
  callGis(textSearch: string): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/CallGis?textSearch=${textSearch}`);
  }
  
  
  search(searchText: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Referer', 'tarwiya');
    const url = `https://auatgisprt001.dev.hq.nwc/nwcmaps/rest/services/HAJJ/TarwiyaMap/MapServer/find?token=1cRJwi28AgkWpWNfliTqJrxBT5eySsKDIZXnjNJEFPFlxtRD4561pWQrNpepmpuV&f=json&searchText=${searchText}&searchFields=ToiletNumber%2CID1&layers=0%2C1`;
    console.log(url);
     return this.http.get<any>(url, { headers });
  }
}
