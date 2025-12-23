import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './admin/top-navbar/top-navbar.component';
import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import ar from '@angular/common/locales/en';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
//import { NZ_I18N, ar_SA } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AuthGuard } from './services/auth-guard.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AuthInterceptor } from './services/auth.interceptor.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Unauthorized401Component } from './unauthorized-401/unauthorized-401.component';
import { AdminModule } from './admin/admin.module';
import { CallCenterModule } from './call-center/call-center.module';
import { AccountLoginComponent } from './account-login/account-login.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { StoreModule } from '@ngrx/store';
import { cacheReducer } from './caching/cache.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CacheEffects } from './caching/cache.effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeAr from '@angular/common/locales/ar';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ComplaintImgComponent } from './complaint-img/complaint-img.component';
import { RecaptchaModule } from 'ng-recaptcha';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeEn); // to handle lang in the date pipe
registerLocaleData(localeAr); // to handle lang in the date pipe

@NgModule({
  declarations: [
    AppComponent,
    PageNotFound404Component,
    Unauthorized401Component,
    AccountLoginComponent,
    ComplaintImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NzFormModule,
    NzListModule,
    NzTableModule,
    NzPaginationModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzIconModule,
    NzUploadModule,
    NzAvatarModule,
    GoogleMapsModule,
    NzModalModule,
    NzSpinComponent,

    NgxChartsModule,

    NoopAnimationsModule,

    AdminModule,
    CallCenterModule,
    RecaptchaModule,
    StoreModule.forRoot({ cache: cacheReducer }),
    EffectsModule.forRoot([CacheEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ar' },
    { provide: NZ_ICONS, useValue: icons },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: PathLocationStrategy }, 
    AuthGuard
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
