import { Component, OnInit } from '@angular/core';
import { UserLoginVM } from '../models/userLoginVM.model';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MassageService } from '../services/massage.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NzI18nService, ar_EG, en_US } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.css'
})

export class AccountLoginComponent  implements OnInit {
  userLoginVM: UserLoginVM = new UserLoginVM('', '');
  loginForm: any;
  direction: string = "";
  currentLang: string = "";
  isSpinningLogin = false;

  constructor(private authService: AuthService, 
              private router: Router, 
              private massageService: MassageService,
              private translate: TranslateService, 
              private i18n: NzI18nService) {
    
   }

  ngOnInit() {   
    this.setDefaultLanguage();
      
    this.intiateform();
  }

  setDefaultLanguage(){
    const lang = this.authService.getCurrentLang();
    this.currentLang = lang == null ? "ar" : this.authService.getCurrentLang();
    this.translate.setDefaultLang(this.currentLang == "ar" ? "ar-SA" : "en-US");
    this.i18n.setLocale(this.currentLang == "ar" ? ar_EG : en_US);
    this.direction = this.currentLang == "ar" ? "rtl" : "ltr" ;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentLang = event.lang;
        this.direction = event.lang == "ar" ? "rtl" : "ltr";
        this.authService.setCurrentLang(this.currentLang);
      });
  }
    
  switchLanguage(): void {
    this.translate.use(this.currentLang == "ar" ? "en" : "ar");
  }

  intiateform() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

submitForm(model: any) {
  if(this.loginForm.valid){

  this.isSpinningLogin = true;
  this.authService.login(model).subscribe({
    next: (result) => 
      {
        if(!result.isSucess){
          this.massageService.showMessage('error', result.error);
        }
        else{
          this.authService.setLoggedInUser(result.data);
        }
      },
      error: (e) => {
        this.massageService.showMessage('error', e.message);
        this.loginForm.reset();
        this.isSpinningLogin = false;
      },
      complete: () => {
        this.loginForm.reset();
        this.isSpinningLogin = false;
      }
  });
}
else{
  Object.keys(this.loginForm.controls).forEach(key => {
    this.loginForm.controls[key].markAsDirty();
  });
}
  }
   captchaResolved = !false;
  captchaToken: string | null = null;

  onCaptchaResolved(token: any): void {
    this.captchaToken = token;
    this.onSubmit();
    console.log('CAPTCHA resolved with token:', token);
  }

  onSubmit(): void {
    
    if ( this.captchaToken) {
      this.authService.VerifyCaptcha( this.captchaToken).subscribe({
    next: (result) => 
      {
        
       this.captchaResolved = true;
       console.log(result)
      },
      error: (e) => {
        this.massageService.showMessage('error', e.message);
        
        this.isSpinningLogin = false;
      },
      complete: () => {
      
        this.isSpinningLogin = false;
      }
  });
      // Send this.captchaToken to your backend for verification
      console.log('Form submitted');
    }
  }
}
