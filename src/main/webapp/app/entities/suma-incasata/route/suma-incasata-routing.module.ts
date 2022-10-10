import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SumaIncasataComponent } from '../list/suma-incasata.component';
import { SumaIncasataDetailComponent } from '../detail/suma-incasata-detail.component';
import { SumaIncasataUpdateComponent } from '../update/suma-incasata-update.component';
import { SumaIncasataRoutingResolveService } from './suma-incasata-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const sumaIncasataRoute: Routes = [
  {
    path: '',
    component: SumaIncasataComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SumaIncasataDetailComponent,
    resolve: {
      sumaIncasata: SumaIncasataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SumaIncasataUpdateComponent,
    resolve: {
      sumaIncasata: SumaIncasataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SumaIncasataUpdateComponent,
    resolve: {
      sumaIncasata: SumaIncasataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sumaIncasataRoute)],
  exports: [RouterModule],
})
export class SumaIncasataRoutingModule {}
