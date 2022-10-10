import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DateAsociatiComponent } from './list/date-asociati.component';
import { DateAsociatiDetailComponent } from './detail/date-asociati-detail.component';
import { DateAsociatiUpdateComponent } from './update/date-asociati-update.component';
import { DateAsociatiDeleteDialogComponent } from './delete/date-asociati-delete-dialog.component';
import { DateAsociatiRoutingModule } from './route/date-asociati-routing.module';

@NgModule({
  imports: [SharedModule, DateAsociatiRoutingModule],
  declarations: [DateAsociatiComponent, DateAsociatiDetailComponent, DateAsociatiUpdateComponent, DateAsociatiDeleteDialogComponent],
})
export class DateAsociatiModule {}
