import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AuthGuard } from './services/auth-guard.service';
import { Unauthorized401Component } from './unauthorized-401/unauthorized-401.component';
import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { CallCenterComponent } from './call-center/call-center/call-center.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ComplaintImgComponent } from './complaint-img/complaint-img.component';

export const routes: Routes = [  
  { path: '', redirectTo: 'account/login', pathMatch: 'full'},
  { path: 'account/login', component: AccountLoginComponent },  
  { path: 'callcenter', component: CallCenterComponent, canActivate: [AuthGuard] },
  { path: 'complaintImg', component: ComplaintImgComponent },  
  {
    path: '',
    component: AdminComponent,
    children: [
        {
      path: '',
      canActivate: [AuthGuard],
      loadChildren: () => import('./admin/admin.module').then(x=> x.AdminModule)
  }]},

  { path: 'unauthorized', component: Unauthorized401Component }, // Handle 401 Unauthorized
  { path: '**', component: PageNotFound404Component } // Handle 404 Not Found
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }], // Use path location strategy
  exports: [RouterModule]
})
export class AppRoutingModule { }
