import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ActivitatiPrincipaleComponent } from '../list/activitati-principale.component';
import { ActivitatiPrincipaleDetailComponent } from '../detail/activitati-principale-detail.component';
import { ActivitatiPrincipaleUpdateComponent } from '../update/activitati-principale-update.component';
import { ActivitatiPrincipaleRoutingResolveService } from './activitati-principale-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const activitatiPrincipaleRoute: Routes = [
  {
    path: '',
    component: ActivitatiPrincipaleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActivitatiPrincipaleDetailComponent,
    resolve: {
      activitatiPrincipale: ActivitatiPrincipaleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActivitatiPrincipaleUpdateComponent,
    resolve: {
      activitatiPrincipale: ActivitatiPrincipaleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActivitatiPrincipaleUpdateComponent,
    resolve: {
      activitatiPrincipale: ActivitatiPrincipaleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(activitatiPrincipaleRoute)],
  exports: [RouterModule],
})
export class ActivitatiPrincipaleRoutingModule {}
