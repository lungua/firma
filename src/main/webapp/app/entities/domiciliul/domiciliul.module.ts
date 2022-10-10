import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DomiciliulComponent } from './list/domiciliul.component';
import { DomiciliulDetailComponent } from './detail/domiciliul-detail.component';
import { DomiciliulUpdateComponent } from './update/domiciliul-update.component';
import { DomiciliulDeleteDialogComponent } from './delete/domiciliul-delete-dialog.component';
import { DomiciliulRoutingModule } from './route/domiciliul-routing.module';

@NgModule({
  imports: [SharedModule, DomiciliulRoutingModule],
  declarations: [DomiciliulComponent, DomiciliulDetailComponent, DomiciliulUpdateComponent, DomiciliulDeleteDialogComponent],
})
export class DomiciliulModule {}
