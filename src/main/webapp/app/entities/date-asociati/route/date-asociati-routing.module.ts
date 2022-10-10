import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DateAsociatiComponent } from '../list/date-asociati.component';
import { DateAsociatiDetailComponent } from '../detail/date-asociati-detail.component';
import { DateAsociatiUpdateComponent } from '../update/date-asociati-update.component';
import { DateAsociatiRoutingResolveService } from './date-asociati-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const dateAsociatiRoute: Routes = [
  {
    path: '',
    component: DateAsociatiComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DateAsociatiDetailComponent,
    resolve: {
      dateAsociati: DateAsociatiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DateAsociatiUpdateComponent,
    resolve: {
      dateAsociati: DateAsociatiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DateAsociatiUpdateComponent,
    resolve: {
      dateAsociati: DateAsociatiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dateAsociatiRoute)],
  exports: [RouterModule],
})
export class DateAsociatiRoutingModule {}
