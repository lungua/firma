import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CapitalSocialComponent } from '../list/capital-social.component';
import { CapitalSocialDetailComponent } from '../detail/capital-social-detail.component';
import { CapitalSocialUpdateComponent } from '../update/capital-social-update.component';
import { CapitalSocialRoutingResolveService } from './capital-social-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const capitalSocialRoute: Routes = [
  {
    path: '',
    component: CapitalSocialComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CapitalSocialDetailComponent,
    resolve: {
      capitalSocial: CapitalSocialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CapitalSocialUpdateComponent,
    resolve: {
      capitalSocial: CapitalSocialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CapitalSocialUpdateComponent,
    resolve: {
      capitalSocial: CapitalSocialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(capitalSocialRoute)],
  exports: [RouterModule],
})
export class CapitalSocialRoutingModule {}
