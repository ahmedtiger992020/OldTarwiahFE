import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  LoggedInUsername: any;
  LoggedInUserRole: any;

  constructor(private authService: AuthService, 
              private translate: TranslateService){

  }

  ngOnInit(): void {
    // let loggedInUser = this.authService.getLoggedInUser();
    // this.LoggedInUsername = loggedInUser.userName.toUpperCase();
    // this.LoggedInUserRole = loggedInUser.role;
    
    $(document).ready(function() {      
      $('.user-dropdown').hide();

      $('.user-details').click(function() {
        $('.user-dropdown').toggle();
      });
    });
  }

  signout() {
    this.authService.signout();
  }
}
