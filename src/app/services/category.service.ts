import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.staging';
import { CategorySearchCriteria } from '../models/categorySearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories1(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/category/GetCategories`);
  }
  
  getCategories(data: CategorySearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/category/GetCategories`, data);
  }
  
  getCategoryLookUps(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/category/GetCategoryLookUps`);
  }
  
  getCategoryItems(categoryId: number): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/category/GetCategoryItems?categoryId=${categoryId}`);
  }
  
  getSources(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/category/GetSources`);
  }

  importFile(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/category/Import`, formData);
  }
}
