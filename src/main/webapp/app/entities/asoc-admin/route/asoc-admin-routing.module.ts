import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AsocAdminComponent } from '../list/asoc-admin.component';
import { AsocAdminDetailComponent } from '../detail/asoc-admin-detail.component';
import { AsocAdminUpdateComponent } from '../update/asoc-admin-update.component';
import { AsocAdminRoutingResolveService } from './asoc-admin-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const asocAdminRoute: Routes = [
  {
    path: '',
    component: AsocAdminComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AsocAdminDetailComponent,
    resolve: {
      asocAdmin: AsocAdminRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AsocAdminUpdateComponent,
    resolve: {
      asocAdmin: AsocAdminRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AsocAdminUpdateComponent,
    resolve: {
      asocAdmin: AsocAdminRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(asocAdminRoute)],
  exports: [RouterModule],
})
export class AsocAdminRoutingModule {}
