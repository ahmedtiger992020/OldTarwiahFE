import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent implements OnInit, OnChanges {
userName: any;
  //@Output() logoutEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private authService: AuthService, 
    private router: Router){

  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.isLogin = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    // let _loggedInUser = this.authService.getLoggedInUser();
    // this.userName = _loggedInUser?.userName;
  }

  signout() {
      this.authService.signout();
    }
}
