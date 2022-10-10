import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlteActivitatiComponent } from '../list/alte-activitati.component';
import { AlteActivitatiDetailComponent } from '../detail/alte-activitati-detail.component';
import { AlteActivitatiUpdateComponent } from '../update/alte-activitati-update.component';
import { AlteActivitatiRoutingResolveService } from './alte-activitati-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const alteActivitatiRoute: Routes = [
  {
    path: '',
    component: AlteActivitatiComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlteActivitatiDetailComponent,
    resolve: {
      alteActivitati: AlteActivitatiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlteActivitatiUpdateComponent,
    resolve: {
      alteActivitati: AlteActivitatiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlteActivitatiUpdateComponent,
    resolve: {
      alteActivitati: AlteActivitatiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alteActivitatiRoute)],
  exports: [RouterModule],
})
export class AlteActivitatiRoutingModule {}
