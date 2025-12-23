import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnChanges{
  //@Input() isLogin : any;
  isLogin: boolean = false;

  constructor(private authService: AuthService, 
              private translate: TranslateService){
    this.translate.setDefaultLang('ar');
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn();
  }

  // checkIsUserLoggedIn(_isLogin: boolean){
  //   this.isLogin = _isLogin;
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLogin = this.authService.isLoggedIn();

  }
  
  switchLanguage(language: string): void {
    this.translate.use(language);
  }
  title = 'nwc.Tarwya.Portal';
}
