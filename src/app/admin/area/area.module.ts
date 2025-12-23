import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaListComponent } from './area-list/area-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AdminRoutingModule } from '../admin-routing.module';


@NgModule({
  declarations: [
    AreaListComponent
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
    NzSelectModule,
    NzIconModule
  ], 
  providers:[
    //NzModalRef,
    //NzModalService
  ], 
  schemas: [NO_ERRORS_SCHEMA]
})
export class AreaModule { }
