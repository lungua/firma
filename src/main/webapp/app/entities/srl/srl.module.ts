import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SrlComponent } from './list/srl.component';
import { SrlDetailComponent } from './detail/srl-detail.component';
import { SrlUpdateComponent } from './update/srl-update.component';
import { SrlDeleteDialogComponent } from './delete/srl-delete-dialog.component';
import { SrlRoutingModule } from './route/srl-routing.module';

@NgModule({
  imports: [SharedModule, SrlRoutingModule],
  declarations: [SrlComponent, SrlDetailComponent, SrlUpdateComponent, SrlDeleteDialogComponent],
})
export class SrlModule {}
