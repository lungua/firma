import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DovadaComponent } from '../list/dovada.component';
import { DovadaDetailComponent } from '../detail/dovada-detail.component';
import { DovadaUpdateComponent } from '../update/dovada-update.component';
import { DovadaRoutingResolveService } from './dovada-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const dovadaRoute: Routes = [
  {
    path: '',
    component: DovadaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DovadaDetailComponent,
    resolve: {
      dovada: DovadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DovadaUpdateComponent,
    resolve: {
      dovada: DovadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DovadaUpdateComponent,
    resolve: {
      dovada: DovadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dovadaRoute)],
  exports: [RouterModule],
})
export class DovadaRoutingModule {}
