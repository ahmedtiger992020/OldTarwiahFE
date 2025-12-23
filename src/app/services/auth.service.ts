import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSearchCriteria } from '../models/userSearchCriteria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.staging';
import { UserLoginVM } from '../models/userLoginVM.model';
import { UserVM } from '../models/userVM';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    return this.getLoggedInUser() != null;
  }

  constructor(private http: HttpClient, 
              private router: Router) { }
secret ='6LfNSFMrAAAAAFfNwF5vSfCtAX9a4pjr-wsR4mcB'
  setLoggedInUser(value: any): void {
    sessionStorage.setItem('LoggedInUser', JSON.stringify(value));
    this.setCurrentLang('ar');
    
    let roles: string[] = value.roles.split(',');
    if (roles.includes('Administrator')){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/callcenter']);
    }
   }

  setCurrentLang(currentLang: string): any {
    this.removeItem('CurrentLang');
    sessionStorage.setItem('CurrentLang', currentLang);
  }

  getCurrentLang(): any {
    return sessionStorage.getItem('CurrentLang');
  }

  getLayoutDirection(): any {
    const lang = sessionStorage.getItem('CurrentLang');
    return lang == "ar" ? "rtl" : "ltr" ;
  }

  getLoggedInUser(): any {
    const item = sessionStorage.getItem('LoggedInUser');
    return item ? JSON.parse(item) : null;
  }

  signout(): void {
    sessionStorage.clear();
    this.router.navigate(['/account/login']);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
  
  login(data: UserLoginVM): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/account/login`, data);
  }
  
  getRoles(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/account/getroles`);
  }
  
  addUser(data: UserVM): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/account/createUser`, data);
  }
  
  getIdentityUsers(data: UserSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/account/GetIdentityUsers`, data);
  }
  VerifyCaptcha(token:any)
  {
    return this.http.post<any>( `https://www.google.com/recaptcha/api/siteverify?secret=${this.secret}&response=${token}`,null);

  }
}
