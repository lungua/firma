import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ActivitatiPrincipaleComponent } from './list/activitati-principale.component';
import { ActivitatiPrincipaleDetailComponent } from './detail/activitati-principale-detail.component';
import { ActivitatiPrincipaleUpdateComponent } from './update/activitati-principale-update.component';
import { ActivitatiPrincipaleDeleteDialogComponent } from './delete/activitati-principale-delete-dialog.component';
import { ActivitatiPrincipaleRoutingModule } from './route/activitati-principale-routing.module';

@NgModule({
  imports: [SharedModule, ActivitatiPrincipaleRoutingModule],
  declarations: [
    ActivitatiPrincipaleComponent,
    ActivitatiPrincipaleDetailComponent,
    ActivitatiPrincipaleUpdateComponent,
    ActivitatiPrincipaleDeleteDialogComponent,
  ],
})
export class ActivitatiPrincipaleModule {}
