import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DateSocietateComponent } from './list/date-societate.component';
import { DateSocietateDetailComponent } from './detail/date-societate-detail.component';
import { DateSocietateUpdateComponent } from './update/date-societate-update.component';
import { DateSocietateDeleteDialogComponent } from './delete/date-societate-delete-dialog.component';
import { DateSocietateRoutingModule } from './route/date-societate-routing.module';

@NgModule({
  imports: [SharedModule, DateSocietateRoutingModule],
  declarations: [DateSocietateComponent, DateSocietateDetailComponent, DateSocietateUpdateComponent, DateSocietateDeleteDialogComponent],
})
export class DateSocietateModule {}
