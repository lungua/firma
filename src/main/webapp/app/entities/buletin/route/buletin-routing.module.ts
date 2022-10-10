import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BuletinComponent } from '../list/buletin.component';
import { BuletinDetailComponent } from '../detail/buletin-detail.component';
import { BuletinUpdateComponent } from '../update/buletin-update.component';
import { BuletinRoutingResolveService } from './buletin-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const buletinRoute: Routes = [
  {
    path: '',
    component: BuletinComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BuletinDetailComponent,
    resolve: {
      buletin: BuletinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BuletinUpdateComponent,
    resolve: {
      buletin: BuletinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BuletinUpdateComponent,
    resolve: {
      buletin: BuletinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(buletinRoute)],
  exports: [RouterModule],
})
export class BuletinRoutingModule {}
