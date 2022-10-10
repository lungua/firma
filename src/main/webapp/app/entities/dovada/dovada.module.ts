import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DovadaComponent } from './list/dovada.component';
import { DovadaDetailComponent } from './detail/dovada-detail.component';
import { DovadaUpdateComponent } from './update/dovada-update.component';
import { DovadaDeleteDialogComponent } from './delete/dovada-delete-dialog.component';
import { DovadaRoutingModule } from './route/dovada-routing.module';

@NgModule({
  imports: [SharedModule, DovadaRoutingModule],
  declarations: [DovadaComponent, DovadaDetailComponent, DovadaUpdateComponent, DovadaDeleteDialogComponent],
})
export class DovadaModule {}
