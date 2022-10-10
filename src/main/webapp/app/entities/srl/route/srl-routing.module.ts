import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SrlComponent } from '../list/srl.component';
import { SrlDetailComponent } from '../detail/srl-detail.component';
import { SrlUpdateComponent } from '../update/srl-update.component';
import { SrlRoutingResolveService } from './srl-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const srlRoute: Routes = [
  {
    path: '',
    component: SrlComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SrlDetailComponent,
    resolve: {
      srl: SrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SrlUpdateComponent,
    resolve: {
      srl: SrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SrlUpdateComponent,
    resolve: {
      srl: SrlRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(srlRoute)],
  exports: [RouterModule],
})
export class SrlRoutingModule {}
