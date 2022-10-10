import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProprietariComponent } from './list/proprietari.component';
import { ProprietariDetailComponent } from './detail/proprietari-detail.component';
import { ProprietariUpdateComponent } from './update/proprietari-update.component';
import { ProprietariDeleteDialogComponent } from './delete/proprietari-delete-dialog.component';
import { ProprietariRoutingModule } from './route/proprietari-routing.module';

@NgModule({
  imports: [SharedModule, ProprietariRoutingModule],
  declarations: [ProprietariComponent, ProprietariDetailComponent, ProprietariUpdateComponent, ProprietariDeleteDialogComponent],
})
export class ProprietariModule {}
