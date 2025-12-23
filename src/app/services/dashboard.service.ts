import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetStatistics`);
  }

  getLanguageCallsCountPieChart(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetLanguageCallsCountPieChart`);
  }

  getCallsCountBarChart(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetCallsCountBarChart`);
  }

  getDailyCallsCountLineChart(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetDailyCallsCountLineChart`);
  }

  getCallCenterRowData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetCallCenterRowData`);
  }


  GetKedanaStatisticsPieChart(dateFrom: any, dateTo: any): Observable<any> {
    let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetKedanaStatisticsPieChart${queryString}`);

  }
  GetComplaintsStatisticsPieChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintsStatisticsPieChart${queryString}`);
  }
  GetComplaintsBySourcePieChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintsBySourcePieChart${queryString}`);
  }
  GetKedanaComplaintsPieChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetKedanaComplaintsPieChart${queryString}`);
  }
  GetKedanaBraManualPieChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetKedanaBraManualPieChart${queryString}`);
  }
  GetComplaintsByUserBarChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintsByUserBarChart${queryString}`);
  }
  GetComplaintsByDayBarChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintsByDayBarChart${queryString}`);
  }
  GetComplaintsByMashaarPieChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintsByMashaarPieChart${queryString}`);
  }
  GetComplaintsByMantinanceAreaBarChart(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintsByMantinanceAreaBarChart${queryString}`);
  }
  GetComplaintStatistics(dateFrom: any, dateTo: any): Observable<any> {
     let params = [];
    if (dateFrom != null) {
      params.push(`dateFrom=${encodeURIComponent(dateFrom)}`);
    }
    if (dateTo != null) {
      params.push(`dateTo=${encodeURIComponent(dateTo)}`);
    }
    const queryString = params.length ? '?' + params.join('&') : '';

    return this.http.get<any>(`${environment.apiUrl}/dashboard/GetComplaintStatistics${queryString}`);
  }

}
