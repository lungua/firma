import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SediulComponent } from '../list/sediul.component';
import { SediulDetailComponent } from '../detail/sediul-detail.component';
import { SediulUpdateComponent } from '../update/sediul-update.component';
import { SediulRoutingResolveService } from './sediul-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const sediulRoute: Routes = [
  {
    path: '',
    component: SediulComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SediulDetailComponent,
    resolve: {
      sediul: SediulRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SediulUpdateComponent,
    resolve: {
      sediul: SediulRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SediulUpdateComponent,
    resolve: {
      sediul: SediulRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sediulRoute)],
  exports: [RouterModule],
})
export class SediulRoutingModule {}
