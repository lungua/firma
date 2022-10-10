import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProprietariComponent } from '../list/proprietari.component';
import { ProprietariDetailComponent } from '../detail/proprietari-detail.component';
import { ProprietariUpdateComponent } from '../update/proprietari-update.component';
import { ProprietariRoutingResolveService } from './proprietari-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const proprietariRoute: Routes = [
  {
    path: '',
    component: ProprietariComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProprietariDetailComponent,
    resolve: {
      proprietari: ProprietariRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProprietariUpdateComponent,
    resolve: {
      proprietari: ProprietariRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProprietariUpdateComponent,
    resolve: {
      proprietari: ProprietariRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(proprietariRoute)],
  exports: [RouterModule],
})
export class ProprietariRoutingModule {}
