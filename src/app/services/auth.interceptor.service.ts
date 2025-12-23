import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor  implements HttpInterceptor {

  constructor(private authService: AuthService, 
              private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedInUser = this.authService.getLoggedInUser();
    let currentLang = this.authService.getCurrentLang();
    
    if(request.url.includes(`${environment.apiUrl}`) && !request.url.includes("KedanaComplaint/GetComplaintImg")){
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${loggedInUser?.token}`,
        'Roles': `${loggedInUser?.roles}`, 
        'CurrentLang' : `${currentLang}`
      }
    });
    
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/unauthorized']);
        }
        return throwError(error);
      })
    );
   }
   if(request.url.includes("KedanaComplaint/GetComplaintImg")){
    const modifiedRequest = request.clone({
      setHeaders: {
        'ApiKey': `${environment?.apiKey}`,
      
      }
    });
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/unauthorized']);
        }
        return throwError(error);
      })
    );
   }
  
  return next.handle(request);
  }
}