import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AsocAdminComponent } from './list/asoc-admin.component';
import { AsocAdminDetailComponent } from './detail/asoc-admin-detail.component';
import { AsocAdminUpdateComponent } from './update/asoc-admin-update.component';
import { AsocAdminDeleteDialogComponent } from './delete/asoc-admin-delete-dialog.component';
import { AsocAdminRoutingModule } from './route/asoc-admin-routing.module';

@NgModule({
  imports: [SharedModule, AsocAdminRoutingModule],
  declarations: [AsocAdminComponent, AsocAdminDetailComponent, AsocAdminUpdateComponent, AsocAdminDeleteDialogComponent],
})
export class AsocAdminModule {}
