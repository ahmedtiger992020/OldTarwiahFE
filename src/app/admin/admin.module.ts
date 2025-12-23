import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ComplaintModule } from './complaint/complaint.module';
import { AreaModule } from './area/area.module';
import { CampaignModule } from './campaign/campaign.module';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SeasonModule } from './season/season.module';
import { ToiletModule } from './toilet/toilet.module';
import { ZamzamModule } from './zamzam/zamzam.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AccountModule } from './account/account.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AdminComponent, 
    TopNavbarComponent
  ],
  imports: [
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
    NzDatePickerModule,

    CommonModule,
    AdminRoutingModule,
    ComplaintModule,
    AreaModule,
    CampaignModule,
    CategoryModule,
    DashboardModule,
    FeedbackModule,
    SeasonModule,
    ToiletModule,
    ZamzamModule,
    AccountModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AdminModule { }
