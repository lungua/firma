import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlteActivitatiComponent } from './list/alte-activitati.component';
import { AlteActivitatiDetailComponent } from './detail/alte-activitati-detail.component';
import { AlteActivitatiUpdateComponent } from './update/alte-activitati-update.component';
import { AlteActivitatiDeleteDialogComponent } from './delete/alte-activitati-delete-dialog.component';
import { AlteActivitatiRoutingModule } from './route/alte-activitati-routing.module';

@NgModule({
  imports: [SharedModule, AlteActivitatiRoutingModule],
  declarations: [
    AlteActivitatiComponent,
    AlteActivitatiDetailComponent,
    AlteActivitatiUpdateComponent,
    AlteActivitatiDeleteDialogComponent,
  ],
})
export class AlteActivitatiModule {}
