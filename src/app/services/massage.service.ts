import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, ar_EG } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MassageService implements OnInit {

  constructor(private messageService: NzMessageService, 
              private translate: TranslateService, 
              private i18n: NzI18nService)
  {

  }

  ngOnInit(): void {
    this.translate.setDefaultLang('ar-SA');
    this.i18n.setLocale(ar_EG);
  }
  
  showMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }
}
