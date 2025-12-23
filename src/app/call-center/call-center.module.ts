import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CallCenterComponent } from './call-center/call-center.component';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import localeAr from '@angular/common/locales/ar';
import localeArSA from '@angular/common/locales/ar-SA';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { MapComponent } from './map/map.component';
import { BigMapComponent } from './big-map/big-map.component';
import { CallsCountBarChartComponent } from './calls-count-bar-chart/calls-count-bar-chart.component';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CallLanguagePieChartComponent } from './call-language-pie-chart/call-language-pie-chart.component';
import { DailyCallsCountLineChartComponent } from './daily-calls-count-line-chart/daily-calls-count-line-chart.component';
import { ComplaintLocationMapComponent } from './complaint-location-map/complaint-location-map.component';
import { KedanaComplaintListComponent } from './kedana-complaint-list/kedana-complaint-list.component';
import { CoulmnChartComponent } from './coulmn-chart/coulmn-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

registerLocaleData(localeArSA);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CallCenterComponent,
    MapComponent,
    BigMapComponent,
    CallsCountBarChartComponent,
    CallLanguagePieChartComponent,
    DailyCallsCountLineChartComponent,
    ComplaintLocationMapComponent,
    KedanaComplaintListComponent,
    CoulmnChartComponent,
    DashboardComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    HttpClientModule, 
    FormsModule, 
    NzFormModule, 
    NzListModule, 
    NzTableModule, 
    NzPaginationModule, 
    NzLayoutModule, 
    NzBreadCrumbModule, 
    NzMenuModule, 
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule, 
    NzUploadModule,
    NzDatePickerModule,    
    NzSpinComponent,
    
    NgxChartsModule,

    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'ar-SA' }
  ]
})
export class CallCenterModule { }
