import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Lockup } from '../models/lockup.model';
import { environment } from '../../environments/environment.staging';
import { FeedbackSearchCriteria } from '../models/feedbackSearchCriteria.model';
import { FeedbackVM } from '../models/feedbackVM.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  getFeedbackQuestions1(): Observable<Lockup>{
    return this.http.get<Lockup>(`${environment.apiUrl}/feedback/getFeedbackQuestions`);
  }
  
  getFeedbackQuestions(data: FeedbackSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/feedback/getFeedbackQuestions`, data);
  }
  
  addFeedback(data: FeedbackVM): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/feedback/createFeedbackQuestion`, data);
  }
}