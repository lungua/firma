import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ActivitatiSecundareComponent } from '../list/activitati-secundare.component';
import { ActivitatiSecundareDetailComponent } from '../detail/activitati-secundare-detail.component';
import { ActivitatiSecundareUpdateComponent } from '../update/activitati-secundare-update.component';
import { ActivitatiSecundareRoutingResolveService } from './activitati-secundare-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const activitatiSecundareRoute: Routes = [
  {
    path: '',
    component: ActivitatiSecundareComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActivitatiSecundareDetailComponent,
    resolve: {
      activitatiSecundare: ActivitatiSecundareRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActivitatiSecundareUpdateComponent,
    resolve: {
      activitatiSecundare: ActivitatiSecundareRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActivitatiSecundareUpdateComponent,
    resolve: {
      activitatiSecundare: ActivitatiSecundareRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(activitatiSecundareRoute)],
  exports: [RouterModule],
})
export class ActivitatiSecundareRoutingModule {}
