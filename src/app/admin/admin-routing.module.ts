import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../services/auth-guard.service';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { ComplaintAddComponent } from './complaint/complaint-add/complaint-add.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackAddComponent } from './feedback/feedback-add/feedback-add.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { SeasonListComponent } from './season/season-list/season-list.component';
import { SeasonAddComponent } from './season/season-add/season-add.component';
import { ToiletListComponent } from './toilet/toilet-list/toilet-list.component';
import { ZamzamListComponent } from './zamzam/zamzam-list/zamzam-list.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { AccountListComponent } from './account/account-list/account-list.component';

export const adminRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'complaint', component: ComplaintListComponent, canActivate: [AuthGuard] },
  { path: 'complaint/list', component: ComplaintListComponent, canActivate: [AuthGuard] },
  { path: 'complaint/add', component: ComplaintAddComponent },
  { path: 'area', component: AreaListComponent, canActivate: [AuthGuard] },
  { path: 'area/list', component: AreaListComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'category/list', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackListComponent, canActivate: [AuthGuard] },
  { path: 'feedback/list', component: FeedbackListComponent, canActivate: [AuthGuard] },
  { path: 'feedback/add', component: FeedbackAddComponent, canActivate: [AuthGuard] },
  { path: 'campaign', component: CampaignListComponent, canActivate: [AuthGuard] },
  { path: 'campaign/list', component: CampaignListComponent, canActivate: [AuthGuard] },
  { path: 'season', component: SeasonListComponent, canActivate: [AuthGuard] },
  { path: 'season/list', component: SeasonListComponent, canActivate: [AuthGuard] },
  { path: 'season/add', component: SeasonAddComponent, canActivate: [AuthGuard] },
  { path: 'toilet', component: ToiletListComponent, canActivate: [AuthGuard] },
  { path: 'toilet/list', component: ToiletListComponent, canActivate: [AuthGuard] },
  { path: 'zamzam', component: ZamzamListComponent, canActivate: [AuthGuard] },
  { path: 'zamzam/list', component: ZamzamListComponent, canActivate: [AuthGuard] },
  { path: 'account/add', component: AccountAddComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountListComponent, canActivate: [AuthGuard] },
  { path: 'account/list', component: AccountListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
