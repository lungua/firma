import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DateSocietateComponent } from '../list/date-societate.component';
import { DateSocietateDetailComponent } from '../detail/date-societate-detail.component';
import { DateSocietateUpdateComponent } from '../update/date-societate-update.component';
import { DateSocietateRoutingResolveService } from './date-societate-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const dateSocietateRoute: Routes = [
  {
    path: '',
    component: DateSocietateComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DateSocietateDetailComponent,
    resolve: {
      dateSocietate: DateSocietateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DateSocietateUpdateComponent,
    resolve: {
      dateSocietate: DateSocietateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DateSocietateUpdateComponent,
    resolve: {
      dateSocietate: DateSocietateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dateSocietateRoute)],
  exports: [RouterModule],
})
export class DateSocietateRoutingModule {}
