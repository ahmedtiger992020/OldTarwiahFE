import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let loggedInUser = this.authService.getLoggedInUser();
    let roles: string[] = loggedInUser.roles.split(',');

    if (roles.includes('Administrator') && 
        route.routeConfig?.path != 'callcenter') {
      return true;
    } else if (roles.includes('CallCenter') && 
    route.routeConfig?.path == 'callcenter') {
      return true;
    } 
    else {
      this.router.navigate(['/account/login']); // Redirect to the login page if not logged in
      return false;
    }
  }
}
