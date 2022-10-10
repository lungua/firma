import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BuletinComponent } from './list/buletin.component';
import { BuletinDetailComponent } from './detail/buletin-detail.component';
import { BuletinUpdateComponent } from './update/buletin-update.component';
import { BuletinDeleteDialogComponent } from './delete/buletin-delete-dialog.component';
import { BuletinRoutingModule } from './route/buletin-routing.module';

@NgModule({
  imports: [SharedModule, BuletinRoutingModule],
  declarations: [BuletinComponent, BuletinDetailComponent, BuletinUpdateComponent, BuletinDeleteDialogComponent],
})
export class BuletinModule {}
