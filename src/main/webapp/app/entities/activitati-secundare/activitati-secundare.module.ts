import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ActivitatiSecundareComponent } from './list/activitati-secundare.component';
import { ActivitatiSecundareDetailComponent } from './detail/activitati-secundare-detail.component';
import { ActivitatiSecundareUpdateComponent } from './update/activitati-secundare-update.component';
import { ActivitatiSecundareDeleteDialogComponent } from './delete/activitati-secundare-delete-dialog.component';
import { ActivitatiSecundareRoutingModule } from './route/activitati-secundare-routing.module';

@NgModule({
  imports: [SharedModule, ActivitatiSecundareRoutingModule],
  declarations: [
    ActivitatiSecundareComponent,
    ActivitatiSecundareDetailComponent,
    ActivitatiSecundareUpdateComponent,
    ActivitatiSecundareDeleteDialogComponent,
  ],
})
export class ActivitatiSecundareModule {}
