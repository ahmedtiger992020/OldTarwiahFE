import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountAddComponent } from './account-add/account-add.component';
import { AdminRoutingModule } from '../admin-routing.module';



@NgModule({
  declarations: [
    AccountListComponent,
    AccountAddComponent],
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
    ReactiveFormsModule,
    NzIconModule
  ]
})
export class AccountModule { }
