import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { ComplaintAddComponent } from './complaint-add/complaint-add.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder, NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AgmCoreModule } from '@agm/core';
import { AdminRoutingModule } from '../admin-routing.module';
//import { AgmCoreModule } from '@agm/core';
// import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [    
    ComplaintListComponent,
    ComplaintAddComponent,
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
    NzIconModule

    // AgmCoreModule.forRoot({
    //   apiKey: environment.googleMapsApiKey
    // })
  ], 
  providers:[
    //NzModalRef,
    //NzModalService
  ], 
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComplaintModule { }
