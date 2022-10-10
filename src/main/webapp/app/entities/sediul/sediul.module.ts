import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SediulComponent } from './list/sediul.component';
import { SediulDetailComponent } from './detail/sediul-detail.component';
import { SediulUpdateComponent } from './update/sediul-update.component';
import { SediulDeleteDialogComponent } from './delete/sediul-delete-dialog.component';
import { SediulRoutingModule } from './route/sediul-routing.module';

@NgModule({
  imports: [SharedModule, SediulRoutingModule],
  declarations: [SediulComponent, SediulDetailComponent, SediulUpdateComponent, SediulDeleteDialogComponent],
})
export class SediulModule {}
