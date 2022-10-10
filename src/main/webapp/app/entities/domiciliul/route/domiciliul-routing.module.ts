import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DomiciliulComponent } from '../list/domiciliul.component';
import { DomiciliulDetailComponent } from '../detail/domiciliul-detail.component';
import { DomiciliulUpdateComponent } from '../update/domiciliul-update.component';
import { DomiciliulRoutingResolveService } from './domiciliul-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const domiciliulRoute: Routes = [
  {
    path: '',
    component: DomiciliulComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DomiciliulDetailComponent,
    resolve: {
      domiciliul: DomiciliulRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DomiciliulUpdateComponent,
    resolve: {
      domiciliul: DomiciliulRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DomiciliulUpdateComponent,
    resolve: {
      domiciliul: DomiciliulRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(domiciliulRoute)],
  exports: [RouterModule],
})
export class DomiciliulRoutingModule {}
